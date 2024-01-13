import { filterByParams } from '../../src/lib/filterByParams.js'

const filterCountriesByParams = (countries, params, addFilter) =>
  filterByParams(countries, params, addFilter)

const additionalFilter = ({ continents, a, match }) => {
  if (continents.length && a.hasOwnProperty('continent')) {
    const { continent } = a
    match = !!continent && continents.includes(continent)
  }

  // console.log(match, a, a.district, a.city)
  return match
}

export const GET = ({ db, url }) => {
  const response = filterCountriesByParams(db.countries, url.searchParams, additionalFilter)

  return { code: 200, body: JSON.stringify(response) }
}

export default GET
