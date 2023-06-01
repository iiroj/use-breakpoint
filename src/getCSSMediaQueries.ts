import type { Config } from './createMediaQueries.js'
import createMediaQueries from './createMediaQueries.js'

/**
 * Get CSS native media queries for given breakpoint configuration.
 * @param breakpoints the list of configured breakpoint names and their pixel values
 *
 * @example
 * const breakpoints = { mobile: -1, tablet: 768, desktop: 1280 }
 * const queries = getCSSMediaQueries(breakpoints)
 * // {
   //   "mobile": "@media (max-width: 767px)",
   //   "tablet": "@media (min-width: 768px) and (max-width: 1279px)",
   //   "desktop": "@media (min-width: 1280px)",
   // }
 *
 * @example <caption>Targeting only screen</caption>
 * const breakpoints = { mobile: -1, tablet: 768, desktop: 1280 }
 * const queries = getCSSMediaQueries(breakpoints, 'screen')
 * // {
   //   "mobile": "@media only screen (max-width: 767px)",
   //   "tablet": "@media only screen (min-width: 768px) and (max-width: 1279px)",
   //   "desktop": "@media only screen (min-width: 1280px)",
   // }
 */
const getCSSMediaQueries = <
  C extends Config,
  Q extends Record<keyof C, string>
>(
  breakpoints: C,
  type?: 'all' | 'print' | 'screen'
): Q => {
  const typePrefix = type ? `only ${type} and ` : ''
  const queries = createMediaQueries(breakpoints)

  return queries.reduce((queries, { breakpoint, query }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queries[breakpoint as any] = `@media ${typePrefix}${query}`
    return queries
  }, {} as Q)
}

export default getCSSMediaQueries
