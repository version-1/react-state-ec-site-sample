import { useCallback, useEffect, useMemo, useState } from "react";
import { summarize } from "models/order";

const cartKey = "cart";

const deepCopy = (data) => JSON.parse(JSON.stringify(data))

export const useCart = () => {
  const [cart, setCart] = useState({});

  const codes = useMemo(() => Object.keys(cart), [cart]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(cartKey)) || {};

    setCart(cart);
  }, []);

  const updateAmount = (item, delta) => {
    const newItem = deepCopy(item)
    newItem.form.amount = item.form.amount + delta
    const newCart = {
      ...cart,
      [item.code]: newItem,
    };

    setCart(newCart);
    localStorage.setItem(cartKey, JSON.stringify(newCart));
  };

  const remove = (item) => {
    const newCart = { ...cart };

    delete newCart[item.code];

    setCart(newCart);
    localStorage.setItem(cartKey, JSON.stringify(newCart));
  };

  const add = (item) => updateAmount(item, 0)
  const increment = (item) => updateAmount(item, 1)
  const decrement = (item) => {
    if (item.form.amount === 1) {
      remove(item)
      return
    }

    updateAmount(item, -1)
  }


  const clear = () => {
    localStorage.removeItem(cartKey);
  };

  const has = useCallback((item) => !!cart[item.code], [cart]);

  const summary = useMemo(() => summarize(Object.values(cart)), [cart]);

  const totalAmount = useMemo(
    () => summary.find((it) => it.key === "totalAmount"),
    [summary]
  )?.actualValue;

  return {
    codes,
    cart,
    summary,
    add,
    remove,
    increment,
    decrement,
    clear,
    has,
    totalAmount,
  };
};
