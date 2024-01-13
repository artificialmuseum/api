import { getQueryFromParams } from './getQueryFromParams.js'
import { filterByKeys } from './filterByKeys.js'

export const filterByParams = (response, params, additionalFilter) => {
  const { slugs, keys, cities, countries, districts, continents } = getQueryFromParams(params)

  if (slugs.length || cities.length || countries.length || districts.length || continents.length) {
    response = response.filter(a => {
      let match = false

      if (slugs.length) {
        match = slugs.includes(a.slug)
      }

      if (additionalFilter) {
        match = additionalFilter({ cities, countries, continents, districts, match, a })
      }

      return match
    })
  }

  if (keys.custom.length || keys.exclude.length) {
    response = response.map(a => filterByKeys(a, keys))
  }

  return response
}
