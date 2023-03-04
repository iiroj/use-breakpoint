import createMediaQueries from '../src/createMediaQueries.js'

describe('createMediaQueries', () => {
  it('should return min-width query', () => {
    expect(createMediaQueries({ mobile: 0 })).toEqual([
      {
        breakpoint: 'mobile',
        maxWidth: null,
        minWidth: 0,
        query: '(min-width: 0px)',
      },
    ])
  })

  it('should return max-width query', () => {
    expect(createMediaQueries({ tablet: 768 })).toEqual([
      {
        breakpoint: 'tablet',
        maxWidth: null,
        minWidth: 768,
        query: '(min-width: 768px)',
      },
    ])
  })

  it('should return min-width and, max-width queries', () => {
    expect(createMediaQueries({ mobile: 0, tablet: 768 })).toEqual([
      {
        breakpoint: 'tablet',
        maxWidth: null,
        minWidth: 768,
        query: '(min-width: 768px)',
      },
      {
        breakpoint: 'mobile',
        maxWidth: 767,
        minWidth: 0,
        query: '(min-width: 0px) and (max-width: 767px)',
      },
    ])
  })

  it('should handle negative min-width', () => {
    expect(createMediaQueries({ mobile: -1, tablet: 768 })).toEqual([
      {
        breakpoint: 'tablet',
        maxWidth: null,
        minWidth: 768,
        query: '(min-width: 768px)',
      },
      {
        breakpoint: 'mobile',
        maxWidth: 767,
        minWidth: -1,
        query: '(max-width: 767px)',
      },
    ])
  })
})
