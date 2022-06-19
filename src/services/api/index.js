export const fetchProducts = async ({
  page = 1,
  text = "",
  categories = [],
  price = { min: 0, max: null },
  color = [],
  size = [],
} = {}) => {
  const qs = serializeQueryParameters({
    page,
    text,
    categories,
    price,
    color,
    size
  })

  const res = await fetch(`http://localhost:8080/api/v1/products?${qs}`);
  return await res.json();
};

const serializeQueryParameters = (params, parentKey = '') => {
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
