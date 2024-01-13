import { filterByParams } from '../../src/lib/filterByParams.js'

const filterCitiesByParams = (cities, params, addFilter) =>
  filterByParams(cities, params, addFilter)

const additionalFilter = ({ countries, continents, a, match }) => {
  if (countries.length && a.hasOwnProperty('country')) {
    const { country } = a
    match = !!country && countries.includes(country)
  }

  if (continents.length && a.hasOwnProperty('continent')) {
    const { continent } = a
    match = !!continent && countries.includes(continent)
  }

  // console.log(match, a, a.district, a.city)
  return match
}

export const GET = ({ db, url }) => {
  const response = filterCitiesByParams(db.cities, url.searchParams, additionalFilter)

  return { code: 200, body: JSON.stringify(response) }
}

export default GET
