const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const products = require("./datasource/products");
const User = require("./models/user");
const UserToken = require("./models/user_token");
const cors = require("cors");
const { logMiddleware, authMiddleware } = require("./middlewares");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(cors());
app.use(logMiddleware);
app.use(authMiddleware);

const baseRoute = (path) => `/api/v1${path || ''}`

const loginUserId = 1
const loginUserPassword = "password"

const withColors = (item) => {
  item.colors = {};
  Object.keys(item.stocks).forEach((key) => {
    const sizes = item.stocks[key];
    Object.keys(sizes).forEach((s) => {
      if (sizes[s] > 0) {
        item.colors[key] = true;
      }
    });
  });
};

app.get(baseRoute(), (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.get(baseRoute("/cart/products"), (req, res) => {
  const { codes = [] } = req.query;

  const data = products.reduce((acc, item) => {
    if (!codes.includes(item.code)) {
      return acc
    }

    withColors(item)

    return [...acc, item]
  }, []);

  res.status(200).json({
    data,
  });
});

app.get(baseRoute("/products"), (req, res) => {
  const {
    page = 1,
    limit = 21,
    text = "",
    categories = [],
    price = { min: 0, max: Infinity },
    size = [],
  } = req.query;

  const list = products.filter((item) => {
    item.size = {};
    Object.keys(item.stocks).forEach((key) => {
      const sizes = item.stocks[key];
      Object.keys(sizes).forEach((s) => {
        if (sizes[s] > 0) {
          item.size[s] = true;
        }
      });
    });

    withColors(item)

    if (
      text &&
      !(
        item.title.includes(text) ||
        item.categories.some((cat) => cat.label.includes(text))
      )
    ) {
      return false;
    }

    if (
      categories.length &&
      !categories.every((cat) => {
        return (item.categories || []).some((it) => it.code === cat);
      })
    ) {
      return false;
    }

    if (size.length) {
      if (!size.some((v) => Object.keys(item.size).includes(v))) {
        return false;
      }
    }

    if (price.min > item.price || price.max < item.price) {
      return false;
    }

    return true;
  });

  res.status(200).json({
    data: list.slice((page - 1) * limit, page * limit),
    totalCount: list.length,
    hasNext: list.length > page * limit,
    page: Number(page),
    limit,
  });
});

app.get(baseRoute("/products/:code"), (req, res) => {
  const { code } = req.params;

  const product = products.find((item) => item.code === code);
  if (!product) {
    res.status(404).json();
    return;
  }

  res.status(200).json({
    data: product,
  });
});

app.get(baseRoute("/user"), (_req, res) => {
  const user = User.find(loginUserId);
  if (!user) {
    res.status(404).json();
    return;
  }

  res.status(200).json({
    data: user.serialize,
  });
});

app.post(baseRoute("/auth/token"), (req, res) => {
  const user = User.find(loginUserId);
  if (!user) {
    res.status(404).json({});
    return;
  }

  const { email, password } = req.body;
  if (email !== user.email || password !== loginUserPassword) {
    res.status(403).json({});
    return;
  }

  const userToken = UserToken.find(loginUserId);

  res.status(200).json({
    data: {
      user: user.serialize,
      token: userToken.token
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
