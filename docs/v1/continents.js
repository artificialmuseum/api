import { filterByParams } from '../../src/lib/filterByParams.js'

const filterContinentsByParams = (continents, params, addFilter) =>
  filterByParams(continents, params, addFilter)

const additionalFilter = ({ match }) => match

export const GET = ({ url, db }) => {
  const response = filterContinentsByParams(db.continents, url.searchParams, additionalFilter)

  return { code: 200, body: JSON.stringify(response) }
}

export default GET
