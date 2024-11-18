/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react'
import MatchMediaMock from 'jest-matchmedia-mock'
import React from 'react'

import useBreakpoint from '../src/index.js'

const useDebugValueSpy = jest.spyOn(React, 'useDebugValue')

const CONFIG = { mobile: 0, tablet: 768, desktop: 1280 }

describe('useBreakpoint', () => {
  const matchMedia = new MatchMediaMock()

  afterEach(() => {
    matchMedia.clear()
    jest.resetAllMocks()
  })

  it('should return undefined breakpoint value client-side when nothing matches', () => {
    matchMedia.useMediaQuery('(min-width: 0px)')

    const { result } = renderHook(() => useBreakpoint(CONFIG))

    const EXPECTED = {
      breakpoint: null,
      minWidth: null,
      maxWidth: null,
      query: null,
    }

    expect(result.current).toStrictEqual(EXPECTED)

    expect(useDebugValueSpy).toHaveBeenCalledTimes(1)
    expect(useDebugValueSpy.mock.calls[0][0]).toStrictEqual(EXPECTED)
    expect(useDebugValueSpy.mock.calls[0][1]?.(EXPECTED)).toStrictEqual('')
  })

  it('should return correct breakpoint client-side, with default value', () => {
    matchMedia.useMediaQuery('(min-width: 0px) and (max-width: 767px)')

    const { result } = renderHook(() => useBreakpoint(CONFIG, 'desktop'))

    expect(result.current).toStrictEqual({
      breakpoint: 'mobile',
      minWidth: 0,
      maxWidth: 767,
      query: '(min-width: 0px) and (max-width: 767px)',
    })
  })

  it('should return default value client-side when set', () => {
    matchMedia.useMediaQuery('(min-width: 0px)')

    const { result } = renderHook(() => useBreakpoint(CONFIG, 'tablet'))

    const EXPECTED = {
      breakpoint: 'tablet',
      minWidth: 768,
      maxWidth: 1279,
      query: '(min-width: 768px) and (max-width: 1279px)',
    }

    expect(result.current).toStrictEqual(EXPECTED)

    expect(useDebugValueSpy).toHaveBeenCalledTimes(1)
    expect(useDebugValueSpy.mock.calls[0][0]).toStrictEqual(EXPECTED)
    expect(useDebugValueSpy.mock.calls[0][1]?.(EXPECTED)).toStrictEqual(
      'tablet (768 ≤ x < 1280)',
    )
  })

  it('should return correct breakpoint client-side without default value', () => {
    matchMedia.useMediaQuery('(min-width: 0px) and (max-width: 767px)')

    const { result } = renderHook(() => useBreakpoint(CONFIG))

    const EXPECTED = {
      breakpoint: 'mobile',
      minWidth: 0,
      maxWidth: 767,
      query: '(min-width: 0px) and (max-width: 767px)',
    }

    expect(result.current).toStrictEqual(EXPECTED)

    expect(useDebugValueSpy).toHaveBeenCalledTimes(1)
    expect(useDebugValueSpy.mock.calls[0][0]).toStrictEqual(EXPECTED)
    expect(useDebugValueSpy.mock.calls[0][1]?.(EXPECTED)).toStrictEqual(
      'mobile (0 ≤ x < 768)',
    )
  })

  it('should react to changes in window.matchMedia client-side', () => {
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

    expect(useDebugValueSpy).toHaveBeenCalledTimes(2)
    expect(useDebugValueSpy.mock.calls[1][0]).toStrictEqual(EXPECTED)
    expect(useDebugValueSpy.mock.calls[1][1]?.(EXPECTED)).toStrictEqual(
      'desktop (1280 ≤ x)',
    )
  })
})
