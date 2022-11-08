import qs from "qs";

export const sortOptions = [
  { label: "新着順", value: "latest", group: "sortType" },
  { label: "価格の高い順", value: "higherPrice", group: "sortType" },
  { label: "価格の安い順", value: "lowerPrice", group: "sortType" },
];

export const categoryList = [
  {
    label: "Men's",
    value: "men",
    group: "categories",
  },
  {
    label: "Women's",
    value: "women",
    group: "categories",
  },
  {
    label: "Kids",
    value: "kids",
    group: "categories",
  },
  {
    label: "コート",
    value: "coats",
    group: "categories",
  },
  {
    label: "T シャツ",
    value: "t-shirts",
    group: "categories",
  },
  {
    label: "ジーンズ",
    value: "jeans",
    group: "categories",
  },
  {
    label: "ボトムス",
    value: "shorts",
    group: "categories",
  },
  {
    label: "その他（アクセサリ・ベルト）",
    value: "others",
    group: "categories",
  },
];

export const priceLabels = [
  {
    label: "¥0 ~ 5,000",
    value: { min: 0, max: 5000 },
    group: "price",
  },
  {
    label: "¥5,000 ~ 10,000",
    value: { min: 5000, max: 10000 },
    group: "price",
  },
  {
    label: "¥10,000 ~ 20,000",
    value: { min: 10000, max: 20000 },
    group: "price",
  },
  {
    label: "¥20,000 ~ 30,000",
    value: { min: 20000, max: 30000 },
    group: "price",
  },
  {
    label: "¥30,000 ~ 40,000",
    value: { min: 30000, max: 40000 },
    group: "price",
  },
  {
    label: "¥40,000 ~ 50,000",
    value: { min: 40000, max: 50000 },
    group: "price",
  },
  {
    label: "¥50,000 ~ ",
    value: { min: 50000, max: Infinity },
    group: "price",
  },
];

export const sizeList = [
  {
    label: "XS",
    value: "xs",
    group: "size",
  },
  {
    label: "S",
    value: "s",
    group: "size",
  },
  {
    label: "M",
    value: "m",
    group: "size",
  },
  {
    label: "L",
    value: "l",
    group: "size",
  },
  {
    label: "XL",
    value: "xl",
    group: "size",
  },
];

export const colorList = [
  {
    label: "レッド",
    value: "red",
    group: "color",
  },
  {
    label: "ネイビー",
    value: "navy",
    group: "color",
  },
  {
    label: "グレー",
    value: "gray",
    group: "color",
  },
  {
    label: "ブラック",
    value: "black",
    group: "color",
  },
  {
    label: "ホワイト",
    value: "white",
    group: "color",
  },
];

const singleChoiceGroups = ["price", "sortType", "text", "page"];

const indexedByValue = (list, cb) => {
  return list.reduce((acc, item) => {
    const key = cb ? cb(item) : item.value;
    return { ...acc, [key]: item };
  }, {});
};

export const uniq = (list) => {
  return Object.values(
    indexedByValue(list, (item) =>
      singleChoiceGroups.includes(item.group) ? item.group : `${item.group}-${item.value}`
    )
  );
};

const indexedSizeList = indexedByValue(sizeList);
const indexedColorList = indexedByValue(colorList);
const indexedCategoryList = indexedByValue(categoryList);

const priceKey = ({ value: { min, max } } = {}) => {
  return `${min}-${max}`;
};
const indexedPriceLabels = indexedByValue(priceLabels, priceKey);

export const serialize = (filters) => {
  return filters.reduce((acc, item) => {
    if (item.group) {
      if (singleChoiceGroups.includes(item.group)) {
        return { ...acc, [item.group]: item.value };
      }

      if (["categories", "color", "size"].includes(item.group)) {
        const list = acc[item.group] || [];
        return { ...acc, [item.group]: [...list, item.value] };
      }
    }

    return acc;
  }, {});
};

export const deserialize = (queryString) => {
  const params = qs.parse(queryString);

  return Object.keys(params).reduce((acc, key) => {
    const v = params[key];
    if (key === "text") {
      if (v) {
        return [
          ...acc,
          {
            label: v,
            value: v,
            group: "text",
          },
        ];
      }
    }

    if (key === "price") {
      const value = indexedPriceLabels[priceKey({ value: v })];
      if (value) {
        return [...acc, value];
      }
    }

    if (key === "color") {
      return v.reduce((_acc, item) => {
        const vv = indexedColorList[item];
        return vv ? [..._acc, vv] : acc;
      }, acc);
    }

    if (key === "categories") {
      return v.reduce((_acc, item) => {
        const vv = indexedCategoryList[item];
        return vv ? [..._acc, vv] : acc;
      }, acc);
    }

    if (key === "size") {
      return v.reduce((_acc, item) => {
        const vv = indexedSizeList[item];
        return vv ? [..._acc, vv] : acc;
      }, acc);
    }

    return acc;
  }, []);
};

export const sort = (sortType, data) => {
  const sortCallbacks = {
    latest: (data) => {
      data.sort((a, b) => a.id > b.id ? 1 : 1);
      return data;
    },
    higherPrice: (data) => {
      data.sort((a, b) => a.price > b.price ? -1 : 1);
      return data;
    },
    lowerPrice: (data) => {
      data.sort((a, b) => a.price > b.price ? 1 : -1);
      return data
    },
  };

  const cb = sortCallbacks[sortType];
  if (!cb) {
    return data;
  }

  return cb(data);
};
