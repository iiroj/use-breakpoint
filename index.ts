import React from "react";
const { useEffect, useMemo, useState } = React;

export type Config = {
  readonly [key: string]: number;
};

export type Breakpoint = {
  breakpoint: string;
  maxWidth?: number;
  minWidth: number;
};

type MediaQuery = {
  breakpoint: string;
  maxWidth?: number;
  minWidth: number;
  query: string;
};

const createMediaQueries = (breakpoints: Config) => {
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

    const mediaQuery: MediaQuery = {
      breakpoint,
      maxWidth,
      minWidth,
      query
    };

    return mediaQuery;
  });
};

export default function useBreakpoint(config: Config): Breakpoint | undefined;

export default function useBreakpoint<C extends Config>(
  config: C,
  defaultBreakpoint: keyof C
): Breakpoint;

export default function useBreakpoint<C extends Config>(
  config: C,
  defaultBreakpoint?: keyof C
) {
  const mediaQueries = useMemo(() => createMediaQueries(config), [config]);

  const [currentBreakpoint, setCurrentBreakpoint] = useState(() => {
    if (!defaultBreakpoint) return undefined;

    const { query, ...breakpoint } = mediaQueries.find(
      query => query.breakpoint === defaultBreakpoint
    )!;

    return breakpoint;
  });

  const updateBreakpoint = (
    { matches }: MediaQueryList,
    breakpoint: Breakpoint
  ) => {
    if (matches) {
      setCurrentBreakpoint(breakpoint);
    }
  };

  useEffect(() => {
    mediaQueries.forEach(({ query, ...breakpoint }) => {
      const mediaQuery = window.matchMedia(query);
      updateBreakpoint(mediaQuery, breakpoint);
      const handleChange = () => updateBreakpoint(mediaQuery, breakpoint);
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    });
  }, [config]);

  return currentBreakpoint;
}
