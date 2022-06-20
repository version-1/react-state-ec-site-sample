const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const products = require("./datasource/products");
const cors = require("cors");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(cors());

app.get("/api/v1/", (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.get("/api/v1/products", (req, res) => {
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

    item.colors = {};
    Object.keys(item.stocks).forEach((key) => {
      const sizes = item.stocks[key];
      Object.keys(sizes).forEach((s) => {
        if (sizes[s] > 0) {
          item.colors[key] = true;
        }
      });
    });

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

app.get("/api/v1/products", (req, res) => {
  const { page = 1, limit = 21 } = req.query;

  res.status(200).json({
    data: products.slice((page - 1) * limit, page * limit),
    totalCount: products.length,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
