# use-breakpoint

[![GitHub Actions](https://github.com/iiroj/use-breakpoint/workflows/Tags/badge.svg)](https://github.com/iiroj/use-breakpoint/actions)
[![version](https://img.shields.io/npm/v/use-breakpoint.svg)](https://www.npmjs.com/package/use-breakpoint)
[![code size](https://img.shields.io/github/languages/code-size/iiroj/use-breakpoint.svg)](https://github.com/iiroj/use-breakpoint)

A React hook (>=18) for getting the current responsive media breakpoint.

## `useBreakpoint`

Initialize `useBreakpoint` with a configuration object, and optionally a default breakpoint name (in non-window environments like SSR). The return value will be an object with the breakpoint's name (`string`), min-width, and max-width values (`number`):

```javascript
import useBreakpoint from 'use-breakpoint'

/**
 * It is important to bind the object of breakpoints to a variable for memoization to work correctly.
 * If they are created dynamically, try using the `useMemo` hook.
 */
const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 }

const CurrentBreakpoint = () => {
  const { breakpoint, maxWidth, minWidth } = useBreakpoint(
    BREAKPOINTS,
    'desktop',
  )
  return <p>The current breakpoint is {breakpoint}!</p>
}
```

### Return values

Given a configuration `BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 }` and a window size of `1280x960`, the hook will return as the breakpoint:

1. `const { breakpoint } = useBreakpoint(BREAKPOINTS)`
   - `undefined` when rendered server-side
   - `'desktop'` when rendered client-side
1. `const { breakpoint } = useBreakpoint(BREAKPOINTS, 'mobile')`
   - `'mobile'` when rendered server-side
   - `'mobile'` on the first client-side render
   - `'desktop'` on subsequent client-side renders

### Hydration

If supplied a default breakpoint, the hook will always return that value when rendered server-side. To not cause inconsistencies during the first client-side render, the default value is also used client-side for the first render, instead of the (possibly different) real breakpoint.

For example, given a breakpoint config:

```ts
const { breakpoint } = useBreakpoint(BREAKPOINTS, 'mobile')
```

When rendered server-side, `breakpoint === 'mobile'` always, because there is no window. On client-side with a `desktop`-sized window, on the first render `breakpoint === 'mobile'`, and then on following renders `breakpoint === 'desktop'`. This is to ensure `ReactDOM.hydrate` behaves correctly. The implementation relies on the [`useSyncExternalStore` React hook](https://react.dev/reference/react/useSyncExternalStore) with the `getServerSnapshot` callback.

### Functionality

This hook uses the [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) functionality to calculate the current breakpoint. For a list of breakpoints, we generate some css media queries in the form of `(min-width: XXXpx) and (max-width: YYYpx)` and then add listeners for the changes. `useBreakpoint` will then update its return value when the breakpoint changes from one rule to another.

## `getCSSMediaQueries`

To use the same breakpoint configuration in CSS-in-JS, you can use the `getCSSMediaQueries` helper:

```javascript
import { getCSSMediaQueries } from 'use-breakpoint'

const BREAKPOINTS = { mobile: -1, tablet: 768, desktop: 1280 }

const cssQueries = getCSSMediaQueries(BREAKPOINTS, 'screen')
// {
//    desktop: "@media only screen and (min-width: 1280px)",
//    mobile: "@media only screen and (max-width: 767px)",
//    tablet: "@media only screen and (min-width: 768px) and (max-width: 1279px)",
//  }
```

The second option can be omitted to leave out the media type condition.

## Developing

This project is built with [Typescript](http://www.typescriptlang.org/). A [Storybook](http://storybook.js.org/) is included for local previewing. The easiest way to get started is cloning the repo and starting the storybook server locally via `npm start`.
