export const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products")
  return await res.json()
}
