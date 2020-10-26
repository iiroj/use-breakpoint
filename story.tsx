import * as React from 'react'

import useBreakpoint from './index'

const config = { mobile: 0, tablet: 768, desktop: 1280 }

export const UseBreakpoint = (): JSX.Element => {
  const { breakpoint, minWidth, maxWidth } = useBreakpoint(config, 'mobile')

  return (
    <p>
      The current breakpoint is <strong>{breakpoint}</strong> with{' '}
      <em>min-width</em> of{' '}
      <strong>
        {minWidth}
        px
      </strong>
      {maxWidth ? (
        <>
          {' '}
          and a <em>max-width</em> of <strong>{maxWidth}px</strong>
        </>
      ) : (
        ''
      )}
      !
    </p>
  )
}

UseBreakpoint.storyName = 'useBreakpoint'

export default { title: 'use-breakpoint', component: UseBreakpoint }
