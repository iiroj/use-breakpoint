import createMediaQueries from '../src/createMediaQueries.js'

describe('createMediaQueries', () => {
  it('should return min-width query', () => {
    const queries = createMediaQueries({ mobile: 0 })
    expect(queries).toMatchInlineSnapshot(`
      [
        {
          "breakpoint": "mobile",
          "maxWidth": null,
          "minWidth": 0,
          "query": "(min-width: 0px)",
        },
      ]
    `)
  })

  it('should return max-width query', () => {
    const queries = createMediaQueries({ tablet: 768 })
    expect(queries).toMatchInlineSnapshot(`
      [
        {
          "breakpoint": "tablet",
          "maxWidth": null,
          "minWidth": 768,
          "query": "(min-width: 768px)",
        },
      ]
    `)
  })

  it('should return min-width and, max-width queries', () => {
    const queries = createMediaQueries({ mobile: 0, tablet: 768 })
    expect(queries).toMatchInlineSnapshot(`
      [
        {
          "breakpoint": "tablet",
          "maxWidth": null,
          "minWidth": 768,
          "query": "(min-width: 768px)",
        },
        {
          "breakpoint": "mobile",
          "maxWidth": 767,
          "minWidth": 0,
          "query": "(min-width: 0px) and (max-width: 767px)",
        },
      ]
    `)
  })

  it('should handle negative min-width', () => {
    const queries = createMediaQueries({ mobile: -1, tablet: 768 })
    expect(queries).toMatchInlineSnapshot(`
      [
        {
          "breakpoint": "tablet",
          "maxWidth": null,
          "minWidth": 768,
          "query": "(min-width: 768px)",
        },
        {
          "breakpoint": "mobile",
          "maxWidth": 767,
          "minWidth": -1,
          "query": "(max-width: 767px)",
        },
      ]
    `)
  })
})
