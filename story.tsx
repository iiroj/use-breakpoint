import * as React from 'react'

import useBreakpoint from './src'

const config = { mobile: 0, tablet: 768, desktop: 1280 }

export const WithoutDefaultValue = (): JSX.Element => {
  const { breakpoint, minWidth, maxWidth } = useBreakpoint(config)

  React.useEffect(() => {
    console.log('breakpoint', breakpoint)
  }, [breakpoint])

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

export const WithDefaultValue = (): JSX.Element => {
  const { breakpoint, minWidth, maxWidth } = useBreakpoint(config, 'mobile')

  React.useEffect(() => {
    console.log('breakpoint', breakpoint)
  }, [breakpoint])

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

export const HydrateInitialFalse = (): JSX.Element => {
  const { breakpoint, minWidth, maxWidth } = useBreakpoint(
    config,
    'mobile',
    false
  )

  React.useEffect(() => {
    console.log('breakpoint', breakpoint)
  }, [breakpoint])

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

HydrateInitialFalse.storyName = 'hydrateInitial = false'

export default { title: 'useBreakpoint' }
