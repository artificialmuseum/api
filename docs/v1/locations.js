import { filterByParams } from '../../src/lib/filterByParams.js'

/**
 *
 * @param {DB.Location[]} locations
 * @param {URLSearchParams} params
 * @param {(Function | undefined)} addFilter
 */
const filterLocationsByParams = (locations, params, addFilter) =>
  filterByParams(locations, params, addFilter)

const additionalFilter = ({ countries, cities, districts, a, match }) => {
  if (countries.length && a.hasOwnProperty('country')) {
    const city = db.cities.find(c => c.slug === a.city)

    const country = city?.country
    match = !!country && countries.includes(country)
  }

  if (cities.length) {
    match = !!a.city && cities.includes(a.city)
  }

  if (districts.length) {
    match = !!a.district && districts.includes(a.district)
  }

  return match
}

export const GET = ({ url, db }) => {
  const response = filterLocationsByParams(db.locations, url.searchParams, additionalFilter)

  return { code: 200, body: JSON.stringify(response) }
}

export default GET
