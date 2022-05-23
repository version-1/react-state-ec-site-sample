export const fetchProducts = async () => {
  const res = await fetch("http://localhost:8080/api/v1/products")
  return await res.json()
}
