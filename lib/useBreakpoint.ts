import { useEffect, useMemo, useState, useCallback, useDebugValue } from 'react'

import createMediaQueries from './createMediaQueries'
import type { Config, Breakpoint } from './types'

type Return<C extends Config, D> = D extends null
  ? Breakpoint<C> | null
  : D extends keyof C
  ? Breakpoint<C>
  : never

/**
 * A React hook to use the current responsive breakpoint.
 * Will listen to changes using the window.matchMedia API.
 * @param {*} config the list of configured breakpoint names and their pixel values
 * @param {*} [defaultBreakpoint] the optional default breakpoint
 *
 * @example
 * const breakpoints = { mobile: 0, tablet: 768, desktop: 1280 }
 * ...
 * const result = useBreakpoint(breakpoints)
 * // null | { breakpoint: string; minWidth: number; maxWidth?: number }
 *
 * @example <caption>With default value</caption>
 * const breakpoints = { mobile: 0, tablet: 768, desktop: 1280 }
 * ...
 * const result = useBreakpoint(breakpoints, 'mobile')
 * // breakpoint: { breakpoint: string; minWidth: number; maxWidth?: number }
 */
const useBreakpoint = <C extends Config, D extends keyof C | null>(
  config: C,
  defaultBreakpoint?: D
): Return<C, D> => {
  /** Memoize list of calculated media queries from config */
  const mediaQueries = useMemo(() => createMediaQueries(config), [config])

  /** Get initial breakpoint value */
  const [
    currentBreakpoint,
    setCurrentBreakpoint,
  ] = useState<Breakpoint<C> | null>(() => {
    if (defaultBreakpoint) {
      const { query, ...breakpoint } = mediaQueries.find(
        (query) => query.breakpoint === defaultBreakpoint
      )!
      return (breakpoint as Breakpoint<C>) || null
    }

    return null
  })

  /** If there's a match, update the current breakpoint */
  const updateBreakpoint = useCallback(
    ({ matches }: MediaQueryList, breakpoint: Breakpoint<C>) => {
      if (matches) {
        setCurrentBreakpoint(breakpoint)
      }
    },
    []
  )

  /** On changes to mediaQueries, subscribe to changes using window.matchMedia */
  useEffect(() => {
    const unsubscribers = mediaQueries.map(({ query, ...breakpoint }) => {
      const mediaQuery = window.matchMedia(query)

      updateBreakpoint(mediaQuery, breakpoint as Breakpoint<C>)

      const handleChange = () => {
        updateBreakpoint(mediaQuery, breakpoint as Breakpoint<C>)
      }

      mediaQuery.addListener(handleChange)
      /** Map the unsubscribers array to a list of unsubscriber methods */
      return () => mediaQuery.removeListener(handleChange)
    })

    /** Return a function that when called, will call all unsubscribers */
    return () => unsubscribers.forEach((unsubscriber) => unsubscriber())
  }, [mediaQueries, updateBreakpoint])

  /** Print a nice debug value for React Devtools */
  useDebugValue(currentBreakpoint, (c) =>
    c
      ? `${c.breakpoint} (${c.minWidth} ≤ x${
          c.maxWidth ? ` < ${c.maxWidth}` : ''
        })`
      : ''
  )

  return currentBreakpoint as Return<C, D>
}

export default useBreakpoint
