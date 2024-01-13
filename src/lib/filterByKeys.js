export const filterByKeys = (a, keys) => {
  const copy = { ...a }

  Object.keys(copy).forEach(key => {
    const isAlwaysKey = keys.always.length ? keys.always.includes(key) : true
    const isIncludedKey = keys.custom.length ? keys.custom.includes(key) : true
    const isExcludedKey = keys.exclude.length ? keys.exclude.includes(key) : false

    if ((!isAlwaysKey && !isIncludedKey) || isExcludedKey) {
      delete copy[key]
    }
  })

  return copy
}
