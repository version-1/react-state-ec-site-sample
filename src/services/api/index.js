import { serializeQueryParameters } from "services/query";
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
    size,
  });

  const res = await fetch(`http://localhost:8080/api/v1/products?${qs}`);
  return await res.json();
};
