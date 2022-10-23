const tax = (v) => Math.floor(v * 1.1);

export const summarize = (products) => {
  const count = products.reduce((acc, { form }) => {
    return acc + form.amount;
  }, 0);

  const sum = products.reduce((acc, { form, product }) => {
    return acc + form.amount * product.price;
  }, 0);

  return [
    {
      label: "注文点数",
      value: count,
      actualValue: count,
      key: "count",
      group: "meidum",
    },
    {
      label: "商品合計",
      value: `¥ ${sum.toLocaleString()}`,
      actualValue: sum,
      key: "subtotal",
      group: "medium",
    },
    {
      label: "消費税",
      value: `¥ ${(tax(sum) - sum).toLocaleString()}`,
      actualValue: tax(sum) - sum,
      key: "tax",
      group: "medium",
    },
    {
      label: "合計",
      value: `¥ ${tax(sum).toLocaleString()}`,
      actualValue: tax(sum),
      key: "totalAmount",
      group: "large",
    },
  ];
};
