export const GET = ({ db }) => {
  const { artists, cities, continents, countries, planets, locations, artifacts } = db

  const response = {
    cities: cities.map(c => {
      const { maxBounds, zoom, ...city } = c
      return city
    }),

    countries: countries.map(c => {
      const { box, zoom, ...country } = c
      return country
    }),

    continents,

    artists,

    planets: planets.map(p => {
      const { maxBounds, img, ...planet } = p
      return planet
    }),

    locations: locations.map(l => {
      const { slug, name, lat, lng, logo, district, cnt, href, hash, city } = l

      const result = {
        slug,
        name,
        lat,
        lng,
        logo,
        district,
        cnt,
        href,
        hash,
        city,
      }

      if (!logo) {
        delete result.logo
      }

      return result
    }),

    artifacts: artifacts.map(a => {
      const { slug, name, lat, lng, logo, href, city, hash } = a

      const result = {
        slug,
        name,
        lat,
        lng,
        logo,
        href,
        city,
        hash,
      }

      if (!result.logo) {
        delete result.logo
      }

      return result
    }),
  }

  return { code: 200, body: JSON.stringify(response) }
}

export default GET
