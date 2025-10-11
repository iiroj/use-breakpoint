/** @vitest-environment happy-dom */

import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, it, vi } from 'vitest'
import MatchMediaMock from 'vitest-matchmedia-mock'

import useBreakpoint from '../src/index.js'

const CONFIG = { mobile: 0, tablet: 768, desktop: 1280 }

describe('useBreakpoint', () => {
  const matchMedia = new MatchMediaMock()

  beforeEach(() => {
    matchMedia.clear()
    vi.clearAllMocks()
  })

  it('should return undefined breakpoint value client-side when nothing matches', ({
    expect,
  }) => {
    matchMedia.useMediaQuery('(min-width: 0px)')

    const { result } = renderHook(() => useBreakpoint(CONFIG))

    const EXPECTED = {
      breakpoint: null,
      minWidth: null,
      maxWidth: null,
      query: null,
    }

    expect(result.current).toStrictEqual(EXPECTED)
  })

  it('should return correct breakpoint client-side, with default value', ({
    expect,
  }) => {
    matchMedia.useMediaQuery('(min-width: 0px) and (max-width: 767px)')

    const { result } = renderHook(() => useBreakpoint(CONFIG, 'desktop'))

    expect(result.current).toStrictEqual({
      breakpoint: 'mobile',
      minWidth: 0,
      maxWidth: 767,
      query: '(min-width: 0px) and (max-width: 767px)',
    })
  })

  it('should return default value client-side when set', ({ expect }) => {
    matchMedia.useMediaQuery('(min-width: 0px)')

    const { result } = renderHook(() => useBreakpoint(CONFIG, 'tablet'))

    const EXPECTED = {
      breakpoint: 'tablet',
      minWidth: 768,
      maxWidth: 1279,
      query: '(min-width: 768px) and (max-width: 1279px)',
    }

    expect(result.current).toStrictEqual(EXPECTED)
  })

  it('should return correct breakpoint client-side without default value', ({
    expect,
  }) => {
    matchMedia.useMediaQuery('(min-width: 0px) and (max-width: 767px)')

    const { result } = renderHook(() => useBreakpoint(CONFIG))

    const EXPECTED = {
      breakpoint: 'mobile',
      minWidth: 0,
      maxWidth: 767,
      query: '(min-width: 0px) and (max-width: 767px)',
    }

    expect(result.current).toStrictEqual(EXPECTED)
  })

  it('should react to changes in window.matchMedia client-side', ({
    expect,
  }) => {
    matchMedia.useMediaQuery('(min-width: 0px) and (max-width: 767px)')

    const { result } = renderHook(() => useBreakpoint(CONFIG))

    expect(result.current).toStrictEqual({
      breakpoint: 'mobile',
      minWidth: 0,
      maxWidth: 767,
      query: '(min-width: 0px) and (max-width: 767px)',
    })

    act(() => {
      matchMedia.useMediaQuery('(min-width: 1280px)')
    })

    const EXPECTED = {
      breakpoint: 'desktop',
      minWidth: 1280,
      maxWidth: null,
      query: '(min-width: 1280px)',
    }

    expect(result.current).toStrictEqual(EXPECTED)
  })
})
