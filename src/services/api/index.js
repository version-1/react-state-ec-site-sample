import { serializeQueryParameters } from "services/query";

const defaultErrorHandler = (e) => {
  if (e.status === 403) {
    throw e;
    return;
  }

  console.error(e);
  alert("リクエストに失敗しました");
  return;
};

class HTTPClient {
  _errorHandler = defaultErrorHandler;

  constructor(params = {}) {
    if (params.errorHandler) {
      this._errorHandler = params.errorHandler;
    }
  }

  async request(url, options) {
    try {
      const res = await fetch(url, options);
      if (res.status >= 400) {
        throw res;
      }

      return res;
    } catch (e) {
      debugger;
      if (this.errorHandler) {
        return this._errorHandler(e);
      }
    }
  }

  set errorHandler(handler) {
    this._errorHandler = handler;
  }

  get errorHandler() {
    return this._errorHandler
  }
}

const client = new HTTPClient();

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

  const res = await client.request(
    `http://localhost:8080/api/v1/products?${qs}`
  );
  return await res.json();
};

export const fetchUser = async () => {
  const res = await client.request(`http://localhost:8080/api/v1/user`);
  return await res.json();
};

export const fetchProduct = async ({ code }) => {
  const res = await client.request(
    `http://localhost:8080/api/v1/products/${code}`
  );
  return await res.json();
};

export const fetchProductByCodes = async ({ codes }) => {
  const qs = codes.reduce((acc, code, index) => {
    if (index === 0) {
      return `codes[]=${code}`;
    }

    return acc + `&codes[]=${code}`;
  }, "");

  const res = await client.request(
    `http://localhost:8080/api/v1/cart/products?${qs}`
  );
  return await res.json();
};

export const createToken = async ({ email, password }) => {
  const res = await client.request(`http://localhost:8080/api/v1/auth/token`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await res.json();
};
