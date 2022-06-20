export const serializeQueryParameters = (params, parentKey = '') => {
  return Object.keys(params).reduce((acc, key) => {
    const value = params[key]
    if (Array.isArray(value)) {
      if (params[key]?.length) {
        const str = params[key].map((item) => {
          return parentKey ? `${parentKey}[${key}][]=${item}` : `${key}[]=${item}`
        }).join('&')

        return acc + '&' + str
      }
    }

    if((typeof value === "object" || typeof value === 'function') && (value !== null) ) {
      const str = serializeQueryParameters(value, key)
      if (str) {
        return acc + '&' + str
      }
    }

    if (value !== null && value !== undefined) {
        const str = parentKey ? `${parentKey}[${key}]=${value}` : `${key}=${value}`
        return acc + `&${str}`
    }

    return acc
  }, "")
}

