import { useCallback, useEffect, useMemo, useState } from "react";

const cartKey = "cart";

const tax = (v) => Math.floor(v * 1.1);

export const useCart = () => {
  const [cart, setCart] = useState({});

  const codes = useMemo(() => Object.keys(cart), [cart]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(cartKey)) || {};

    setCart(cart);
  }, []);

  const add = (item) => {
    const newCart = {
      ...cart,
      [item.code]: item,
    };

    setCart(newCart);
    localStorage.setItem(cartKey, JSON.stringify(newCart));
  };

  const remove = (item) => {
    const newCart = { ...cart };

    delete cart[item.code];

    setCart(newCart);
    localStorage.setItem(cartKey, JSON.stringify(newCart));
  };

  const clear = () => {
    localStorage.clear()
  }

  const has = useCallback((item) => !!cart[item.code], [cart]);

  const summary = useMemo(() => {
    const count = Object.values(cart).reduce(
      (acc, { form }) => acc + form.amount,
      0
    );
    const sum = Object.values(cart).reduce(
      (acc, { form, product }) => acc + form.amount * product.price,
      0
    );

    return [
      {
        label: "注文点数",
        value: count,
        actualValue: count,
        key: "count",
        group: "meidum"
      },
      {
        label: "商品合計",
        value: `¥ ${sum.toLocaleString()}`,
        actualValue: sum,
        key: "subtotal",
        group: "medium"
      },
      {
        label: "消費税",
        value: `¥ ${(tax(sum) - sum).toLocaleString()}`,
        actualValue: tax(sum) - sum,
        key: "tax",
        group: "medium"
      },
      {
        label: "合計",
        value: `¥ ${tax(sum).toLocaleString()}`,
        actualValue: tax(sum),
        key: "totalAmount",
        group: "large"
      },
    ];
  }, [cart]);

  const totalAmount = useMemo(() => summary.find((it) => it.key === "totalAmount"), [summary])?.actualValue;

  return {
    codes,
    cart,
    summary,
    add,
    remove,
    clear,
    has,
    totalAmount
  };
};
