export const getQueryFromParams = params => {
  const slugs = [...params.getAll('slug'), ...params.getAll('s')]

  const keys = {
    custom: [...params.getAll('keys'), ...params.getAll('k')],
    always: ['slug', 'name', 'lat', 'lng', 'version', 'logo', 'cnt', 'hash'],
    exclude: [...params.getAll('excludeKeys'), ...params.getAll('e')],
  }

  const countries = params.getAll('country')
  const cities = params.getAll('city')
  const districts = params.getAll('district')
  const continents = params.getAll('continent')

  return {
    slugs,
    keys,
    countries,
    cities,
    districts,
    continents,
  }
}
