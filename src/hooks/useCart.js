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
        group: "meidum"
      },
      {
        label: "商品合計",
        value: `¥ ${sum.toLocaleString()}`,
        group: "medium"
      },
      {
        label: "消費税",
        value: `¥ ${(tax(sum) - sum).toLocaleString()}`,
        group: "medium"
      },
      {
        label: "合計",
        value: `¥ ${tax(sum).toLocaleString()}`,
        group: "large"
      },
    ];
  }, [cart]);

  return {
    codes,
    cart,
    summary,
    add,
    remove,
    has,
  };
};