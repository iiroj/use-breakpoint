import useBreakpoint from '../src/index'
import { renderToStaticMarkup } from 'react-dom/server'
import * as React from 'react'

const CONFIG = { mobile: 0, tablet: 768, desktop: 1280 }

describe('useBreakpoint', () => {
  it('should return undefined value server-side when default not set', () => {
    const Test = () => {
      const { breakpoint } = useBreakpoint(CONFIG)
      return <>{breakpoint}</>
    }

    const result = renderToStaticMarkup(<Test />)
    expect(result).toEqual('')
  })

  it('should return default value server-side when set', () => {
    const Test = () => {
      const { breakpoint } = useBreakpoint(CONFIG, 'mobile')
      return <>{breakpoint}</>
    }

    const result = renderToStaticMarkup(<Test />)
    expect(result).toEqual('mobile')
  })
})
