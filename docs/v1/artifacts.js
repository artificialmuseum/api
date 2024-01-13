import { filterByKeys } from '../../src/lib/filterByKeys.js'

const filterArtifactByKeys = (a, keys) => filterByKeys(a, keys)

export const GET = ({ db, url }) => {
  const slugs = [...url.searchParams.getAll('slug'), ...url.searchParams.getAll('s')]

  const keys = {
    custom: [...url.searchParams.getAll('keys'), ...url.searchParams.getAll('k')],
    always: ['slug', 'name', 'lat', 'lng', 'version', 'city', 'hash'],
    exclude: [...url.searchParams.getAll('excludeKeys'), ...url.searchParams.getAll('e')],
  }

  const cities = url.searchParams.getAll('city')
  const locations = url.searchParams.getAll('location')
  const districts = url.searchParams.getAll('district')
  const featured = url.searchParams.has('featured')
  const config = url.searchParams.has('config')

  if (slugs.length === 1) {
    const a = db.artifacts.find(a => {
      let match = a.slug === slugs[0]

      if (cities.length && (!a.city || !cities.includes(a.city))) {
        match = false
        // throw error(404, `Artifact not found by city ${a.city} ${cities}`)
      }

      if (locations.length && (!a.location || !locations.includes(a.location))) {
        match = false
        // throw error(404, 'Artifact not found')
      }

      return match
    })

    if (!a) {
      return { code: 404, body: '"Artifact not found"' }
    }

    if (config) {
      const {
        name,
        slug,
        lat,
        lng,
        description,

        artists,
        artists3d,
        sound,
        photo,
        team,

        href,

        location,
        city,
        exhibition,
        ...artifact
      } = a

      // console.log('returning artifact config', artifact)

      return { code: 200, body: JSON.stringify(artifact) }
    }

    const artifact = filterArtifactByKeys(a, keys)
    // console.log({ a, artifact, keys })

    // const location = db.locations.find(l => l.slug === artifact.location)
    // const city = db.cities.find(c => c.slug === artifact.city)
    // const artists = db.artists.filter(a => artifact.artists.includes(a.slug))
    // const artists3d = db.artists.filter(a => artifact.artists3d?.includes(a.slug))
    // const sound = db.artists.filter(a => artifact.sound?.includes(a.slug))
    // const photo = db.artists.filter(a => artifact.photo?.includes(a.slug))
    // const team = db.artists.filter(a => artifact.team?.includes(a.slug))

    const maybeFields = [
      'name',
      'slug',
      'description',
      'href',
      'artists',
      'location',
      'city',
      'distance',
      'featured',
      'preview',
      'logo',
      'artists3d',
      'team',
      'sound',
      'photo',
    ]

    const result = { ...artifact }

    Object.entries(result).forEach(([key, value]) => {
      const hasValue = value || value === false || value === 0

      if (!maybeFields.includes(key) || !hasValue) {
        delete result[key]
      }
    })

    return { code: 200, body: JSON.stringify(result) }
  }

  let response = db.artifacts

  if (featured) {
    response = response.filter(a => a.featured)
  } else if (slugs.length || cities.length || locations.length || districts.length) {
    response = response.filter(a => {
      let match = false

      if (slugs.length) {
        match = slugs.includes(a.slug)
      }

      if (cities.length) {
        match = !!a.city && cities.includes(a.city)
      }

      if (locations.length) {
        match = !!a.location && locations.includes(a.location)
      }

      return match
    })
  }

  if (keys.custom.length || keys.exclude.length) {
    response = response.map(a => filterArtifactByKeys(a, keys))
  }

  return { code: 200, body: JSON.stringify(response) }
}

export default GET
