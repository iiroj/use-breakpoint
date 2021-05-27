import {
  useLayoutEffect,
  useMemo,
  useState,
  useCallback,
  useDebugValue,
} from 'react'

import createMediaQueries from './createMediaQueries'
import type { Config, Breakpoint } from './types'

const EMPTY_BREAKPOINT = {
  breakpoint: undefined,
  minWidth: undefined,
  maxWidth: undefined,
} as const

type Return<C extends Config, D> = D extends undefined
  ? Breakpoint<C> | typeof EMPTY_BREAKPOINT
  : D extends keyof C
  ? Breakpoint<C>
  : never

/**
 * A React hook to use the current responsive breakpoint.
 * Will listen to changes using the window.matchMedia API.
 * @param {*} config the list of configured breakpoint names and their pixel values
 * @param {*} [defaultBreakpoint] the optional default breakpoint
 * @param {*} [hydrateInitial] whether to return the default breakpoint on first render. Set to `false` if the real breakpoint should be returned instead. Only applies to the browser, not server-side.
 *
 * @example
 * const breakpoints = { mobile: 0, tablet: 768, desktop: 1280 }
 * ...
 * const result = useBreakpoint(breakpoints)
 * // { breakpoint: string; minWidth: number; maxWidth: number | null } | { breakpoint: undefined; minWidth: undefined; maxWidth: undefined }
 *
 * @example <caption>With default value</caption>
 * const breakpoints = { mobile: 0, tablet: 768, desktop: 1280 }
 * ...
 * const result = useBreakpoint(breakpoints, 'mobile')
 * // breakpoint: { breakpoint: string; minWidth: number; maxWidth: number | null }
 *
 * @example <caption>With default value, but not hydrated. This means the breakpoint might be different on the initial render.</caption>
 * const breakpoints = { mobile: 0, tablet: 768, desktop: 1280 }
 * ...
 * const result = useBreakpoint(breakpoints, 'mobile', false)
 * // breakpoint: { breakpoint: string; minWidth: number; maxWidth: number | null }
 */
const useBreakpoint = <C extends Config, D extends keyof C | undefined>(
  config: C,
  defaultBreakpoint?: D,
  hydrateInitial = true
): Return<C, D> => {
  /** Memoize list of calculated media queries from config */
  const mediaQueries = useMemo(() => createMediaQueries(config), [config])

  /** Get initial breakpoint value */
  const [currentBreakpoint, setCurrentBreakpoint] = useState<
    Breakpoint<C> | typeof EMPTY_BREAKPOINT
  >(() => {
    /** Loop through all media queries */
    for (const { query, ...breakpoint } of mediaQueries) {
      /**
       * If we're in the browser and there's no default value,
       * try to match actual breakpoint. If the default value
       * should not be hydrated, use the actual breakpoint.
       */
      if (
        typeof window !== 'undefined' &&
        !(defaultBreakpoint && hydrateInitial)
      ) {
        const mediaQuery = window.matchMedia(query)
        if (mediaQuery.matches) {
          return breakpoint as Breakpoint<C>
        }
      } else if (breakpoint.breakpoint === defaultBreakpoint) {
        /** Otherwise, try to match default value */
        return breakpoint as Breakpoint<C>
      }
    }

    return EMPTY_BREAKPOINT
  })

  /** If there's a match, update the current breakpoint */
  const updateBreakpoint = useCallback(
    (
      { matches }: MediaQueryList | MediaQueryListEvent,
      breakpoint: Breakpoint<C>
    ) => {
      if (matches) {
        setCurrentBreakpoint(breakpoint)
      }
    },
    []
  )

  /** On changes to mediaQueries, subscribe to changes using window.matchMedia */
  useLayoutEffect(() => {
    const unsubscribers = mediaQueries.map(({ query, ...breakpoint }) => {
      const list = window.matchMedia(query)
      updateBreakpoint(list, breakpoint as Breakpoint<C>)

      const handleChange = (event: MediaQueryListEvent) => {
        updateBreakpoint(event, breakpoint as Breakpoint<C>)
      }

      list.addListener(handleChange)
      /** Map the unsubscribers array to a list of unsubscriber methods */
      return () => list.removeListener(handleChange)
    })

    /** Return a function that when called, will call all unsubscribers */
    return () => unsubscribers.forEach((unsubscriber) => unsubscriber())
  }, [mediaQueries, updateBreakpoint])

  /** Print a nice debug value for React Devtools */
  useDebugValue(currentBreakpoint, (c) =>
    typeof c.breakpoint === 'string'
      ? `${c.breakpoint} (${c.minWidth} ≤ x${
          c.maxWidth ? ` < ${c.maxWidth + 1}` : ''
        })`
      : ''
  )

  return currentBreakpoint as Return<C, D>
}

export default useBreakpoint
