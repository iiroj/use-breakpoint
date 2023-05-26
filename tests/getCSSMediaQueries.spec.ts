import getCSSMediaQueries from '../src/getCSSMediaQueries.js'

describe('createMediaQueries', () => {
  const breakpoints = {
    mobile: -1,
    tablet: 768,
    desktop: 1024,
  }

  it('should return record of breakpoints and CSS media queries', () => {
    const queries = getCSSMediaQueries(breakpoints)
    expect(queries).toMatchInlineSnapshot(`
      {
        "desktop": "@media (min-width: 1024px)",
        "mobile": "@media (max-width: 767px)",
        "tablet": "@media (min-width: 768px) and (max-width: 1023px)",
      }
    `)
  })

  it('should support additional type option', () => {
    const queries = getCSSMediaQueries(breakpoints, 'screen')
    expect(queries).toMatchInlineSnapshot(`
      {
        "desktop": "@media only screen and (min-width: 1024px)",
        "mobile": "@media only screen and (max-width: 767px)",
        "tablet": "@media only screen and (min-width: 768px) and (max-width: 1023px)",
      }
    `)
  })
})
