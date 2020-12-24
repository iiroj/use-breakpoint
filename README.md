# use-breakpoint

[![GitHub Actions](https://github.com/iiroj/use-breakpoint/workflows/Tags/badge.svg)](https://github.com/iiroj/use-breakpoint/actions)
[![version](https://img.shields.io/npm/v/use-breakpoint.svg)](https://www.npmjs.com/package/use-breakpoint)
[![code size](https://img.shields.io/github/languages/code-size/iiroj/use-breakpoint.svg)](https://github.com/iiroj/use-breakpoint)
[![dependencies](https://img.shields.io/david/iiroj/use-breakpoint.svg)](https://github.com/iiroj/use-breakpoint/blob/master/package.json)
[![devDependencies](https://img.shields.io/david/dev/iiroj/use-breakpoint.svg)](https://github.com/iiroj/use-breakpoint/blob/master/package.json)

A React hook (>=16.8) for getting the current responsive media breakpoint, successor to [breakpoint-observer](https://www.npmjs.com/package/breakpoint-observer).

## Usage

Initialize `useBreakpoint` with a configuration object, and optionally a default breakpoint name (in non-window environments like SSR). The return value will be an object with the breakpoint's name (`string`), min-width, and max-width values (`number`):

```javascript
import useBreakpoint from 'use-breakpoint';

/**
 * It is important to bind the object of breakpoints to a variable for memoization to work correctly.
 * If they are created dynamically, try using the `useMemo` hook.
 */
const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 }

const CurrentBreakpoint = () => {
  const { breakpoint, maxWidth, minWidth } = useBreakpoint(BREAKPOINTS, 'desktop');
  return <p>The current breakpoint is {breakpoint}!</p>;
};
```

## Functionality

This hook uses the [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) functionality to calculate the current breakpoint. For a list of breakpoints, we generate some css media queries in the form of `(min-width: XXXpx) and (max-width: YYYpx)` and then add listeners for the changes. `useBreakpoint` will then update its return value when the breakpoint changes from one rule to another.

## Developing

This project is built with [Typescript](http://www.typescriptlang.org/). A [Storybook](http://storybook.js.org/) is included for local previewing. The easiest way to get started is cloning the repo and starting the storybook server locally via `npm start`.
