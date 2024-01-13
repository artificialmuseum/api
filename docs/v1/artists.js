import { filterByKeys } from '../../src/lib/filterByKeys.js'

const filterArtistByKeys = (a, keys) => filterByKeys(a, keys)

export const GET = ({ url, db }) => {
  const { artists } = db

  const slugs = [...url.searchParams.getAll('slug'), ...url.searchParams.getAll('s')]

  const keys = {
    custom: [...url.searchParams.getAll('keys'), ...url.searchParams.getAll('k')],
    always: ['slug', 'name', 'lat', 'lng', 'version'],
    exclude: [...url.searchParams.getAll('excludeKeys'), ...url.searchParams.getAll('e')],
  }

  // console.log('filtering artists using', { slugs, keys })

  if (slugs.length === 1) {
    const a = artists.find(a => a.slug === slugs[0])

    if (!a) {
      return { code: 404, body: `Artist not found ${slugs[0]}` }
    }

    const filtered = filterArtistByKeys(a, keys)
    return { code: 200, body: JSON.stringify(filtered) }
  }

  let response = artists

  if (slugs.length) {
    response = response.filter(a => slugs.includes(a.slug))
  }

  if (keys.custom.length || keys.exclude.length) {
    response = response.map(a => filterArtistByKeys(a, keys))
  }

  return { code: 200, body: JSON.stringify(response) }
}

export default GET
