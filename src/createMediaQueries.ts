import type { Config, MediaQuery } from './types'

/**
 * Create media query objects
 * @param breakpoints the list of configured breakpoint names and their pixel values
 */
const createMediaQueries = (breakpoints: Config): MediaQuery<Config>[] => {
  const sortedBreakpoints = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[b] - breakpoints[a]
  )

  return sortedBreakpoints.map((breakpoint, index) => {
    let query = ''
    const minWidth = breakpoints[breakpoint]
    const nextBreakpoint = sortedBreakpoints[index - 1] as string | undefined
    const maxWidth = nextBreakpoint ? breakpoints[nextBreakpoint] : undefined

    if (minWidth >= 0) {
      query = `(min-width: ${minWidth}px)`
    }

    if (typeof maxWidth !== 'undefined') {
      if (query) {
        query += ' and '
      }
      query += `(max-width: ${maxWidth - 1}px)`
    }

    const mediaQuery: MediaQuery<Config> = {
      breakpoint,
      maxWidth: maxWidth ? maxWidth - 1 : undefined,
      minWidth,
      query,
    }

    return mediaQuery
  })
}

export default createMediaQueries
