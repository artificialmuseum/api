import { filterByKeys } from '../../src/lib/filterByKeys.js'

/**
 *
 *
 * @param {DB.Planet} a
 * @param {APIQueryKeys} keys
 * @returns {DB.Planet}
 */
const filterPlanetByKeys = (a, keys) => filterByKeys(a, keys)

export const GET = ({ url, db }) => {
  const { planets } = db
  // console.log('args in', url.pathname, { url, ...args })

  const slugs = [...url.searchParams.getAll('slug'), ...url.searchParams.getAll('s')]

  const keys = {
    custom: [...url.searchParams.getAll('keys'), ...url.searchParams.getAll('k')],
    always: ['slug', 'name', 'lat', 'lng', 'version'],
    exclude: [...url.searchParams.getAll('excludeKeys'), ...url.searchParams.getAll('e')],
  }

  if (slugs.length === 1) {
    const a = planets.find(a => a.slug === slugs[0])

    if (!a) {
      return { code: 404, body: '"Planet not found"' }
    }

    const filtered = filterPlanetByKeys(a, keys)
    return JSON.stringify(filtered)
    // const href = createHref(a)

    // return JSON.stringify({
    //   ...filtered,
    //   href,
    // })
  }

  let response = planets

  if (slugs.length) {
    response = response.filter(a => slugs.includes(a.slug))
  }

  if (keys.custom.length || keys.exclude.length) {
    response = response.map(a => {
      const res = filterPlanetByKeys(a, keys)
      return res
    })
  }

  return { code: 200, body: JSON.stringify(response) }
}

export default GET
