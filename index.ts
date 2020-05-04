import { useEffect, useMemo, useState, useCallback } from "react";

export type Config = {
  readonly [key: string]: number;
};

export type Breakpoint<C extends Config> = {
  breakpoint: keyof C;
  maxWidth?: number;
  minWidth: C[keyof C];
};

type MediaQuery<C extends Config> = {
  breakpoint: keyof C;
  maxWidth?: number;
  minWidth: C[keyof C];
  query: string;
};

/**
 * Create media query objects
 * @param breakpoints the list of configured breakpoint names and their pixel values
 */
export const createMediaQueries = (breakpoints: Config) => {
  const sortedBreakpoints = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[b] - breakpoints[a]
  );

  return sortedBreakpoints.map((breakpoint, index) => {
    let query = "";
    const minWidth = breakpoints[breakpoint];
    const nextBreakpoint = sortedBreakpoints[index - 1] as string | undefined;
    const maxWidth = nextBreakpoint ? breakpoints[nextBreakpoint] : undefined;

    if (minWidth >= 0) {
      query = `(min-width: ${minWidth}px)`;
    }

    if (typeof maxWidth !== "undefined") {
      if (query) {
        query += " and ";
      }
      query += `(max-width: ${maxWidth - 1}px)`;
    }

    const mediaQuery: MediaQuery<Config> = {
      breakpoint,
      maxWidth,
      minWidth,
      query,
    };

    return mediaQuery;
  });
};

export default function useBreakpoint<C extends Config>(
  config: C
): Breakpoint<C> | undefined;

export default function useBreakpoint<C extends Config>(
  config: C,
  defaultBreakpoint: keyof C
): Breakpoint<C>;

/**
 * A React hook to use the current responsive breakpoint.
 * Will listen to changes using the window.matchMedia API.
 * @param config the list of configured breakpoint names and their pixel values
 * @param defaultBreakpoint the optional default breakpoint
 */
export default function useBreakpoint<C extends Config>(
  config: C,
  defaultBreakpoint?: keyof C
) {
  /**
   * Memoize list of calculated media queries from config
   */
  const mediaQueries = useMemo(() => createMediaQueries(config), [config]);

  /**
   * Get initial breakpoint value
   */
  const [currentBreakpoint, setCurrentBreakpoint] = useState<
    Breakpoint<C> | undefined
  >(() => {
    if (!defaultBreakpoint) return undefined;

    const { query, ...breakpoint } = mediaQueries.find(
      (query) => query.breakpoint === defaultBreakpoint
    )!;

    return breakpoint as Breakpoint<C>;
  });

  /**
   * If there's a match, update the current brekpoint
   */
  const updateBreakpoint = useCallback(
    ({ matches }: MediaQueryList, breakpoint: Breakpoint<C>) => {
      if (matches) {
        setCurrentBreakpoint(breakpoint);
      }
    },
    [setCurrentBreakpoint]
  );

  /**
   * On changes to mediaQueries, subscribe to changes using window.matchMedia.
   */
  useEffect(() => {
    const unsubscribers = mediaQueries.map(({ query, ...breakpoint }) => {
      const mediaQuery = window.matchMedia(query);
      updateBreakpoint(mediaQuery, breakpoint as Breakpoint<C>);
      const handleChange = () =>
        updateBreakpoint(mediaQuery, breakpoint as Breakpoint<C>);
      mediaQuery.addListener(handleChange);
      // map the unsubscribers array to a list of unsubscriber methods
      return () => mediaQuery.removeListener(handleChange);
    });
    // return a function that when called, will call all unsubscribers
    return () => unsubscribers.forEach((unsubscriber) => unsubscriber());
  }, [mediaQueries, updateBreakpoint]);

  return currentBreakpoint;
}
