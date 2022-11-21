import { serializeQueryParameters } from "services/query";

const tokenKey = 'token'

const defaultErrorHandler = (e) => {
  if (e.status === 403) {
    throw e;
  }

  console.error(e);
  alert("リクエストに失敗しました");
  return;
};

class HTTPClient {
  _errorHandler = defaultErrorHandler;
  _clearToken = () => {};
  _token = undefined;

  constructor(params = {}) {
    if (params.errorHandler) {
      this._errorHandler = params.errorHandler;
    }
    this._token = params.token
  }

  async request(url, options = {}) {
    try {
      const headers = (options.headers || {})
      if (this._token) {
        headers['Authorization'] = `Bearer: ${this._token}`
      }
      const res = await fetch(url, {
        ...options,
        headers
      });
      if (res.status >= 400) {
        throw res;
      }

      return await res.json();
    } catch (e) {
      if (this._errorHandler) {
        this._errorHandler(e);
      }

      return { error: e }
    }
  }

  set errorHandler(handler) {
    this._errorHandler = handler;
  }

  set token(value) {
    this._token = value
  }

  set clearToken(handler) {
    this._clearToken = handler
  }

  get errorHandler() {
    return this._errorHandler;
  }
}

const client = new HTTPClient({ token: localStorage.getItem(tokenKey) });

export const BASE_URL = "http://localhost:8080"
const baseURL = (path) => `${BASE_URL}/api/v1` + path;

export const hasToken = (token) => {
  return !!localStorage.getItem(tokenKey, token);
}

export const setToken = (token) => {
  client.token = token
  localStorage.setItem(tokenKey, token);
}

export const clearToken = (token) => {
  if (client._clearToken) {
    client._clearToken()
  }
  client.token = undefined
  localStorage.removeItem(tokenKey, token);
}

export const setClearTokenHandler = (handler) => {
  client.clearToken = handler
}

export const setErrorHandler = (handler) => {
  client.errorHandler = handler
}

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

  return await client.request(baseURL(`/products?${qs}`));
};

export const fetchUser = async () => {
  return await client.request(baseURL(`/user`));
};

export const fetchProduct = async ({ code }) => {
  return await client.request(baseURL(`/products/${code}`));
};

export const fetchProductByCodes = async ({ codes }) => {
  const qs = codes.reduce((acc, code, index) => {
    if (index === 0) {
      return `codes[]=${code}`;
    }

    return acc + `&codes[]=${code}`;
  }, "");

  return await client.request(
    `http://localhost:8080/api/v1/cart/products?${qs}`
  );
};

export const createToken = async ({ email, password }) => {
  return await client.request(baseURL(`/auth/token`), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const checkout = async ({
  userId,
  products,
  shipmentInfo,
  totalAmount
}) => {
  return await client.request(baseURL(`/user/orders`), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      totalAmount,
      products,
      shipmentInfo,
      paymentInfo: {},
    }),
  });
};

export const fetchOrders = async () => {
  return await client.request(baseURL(`/user/orders`));
};

