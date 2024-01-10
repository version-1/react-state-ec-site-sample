import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { summarize } from "models/order";
import { fetchProductByCodes } from "services/api";
import { queryClient } from "services/tanstack";

const cartKey = "cart";

const deepCopy = (data) => JSON.parse(JSON.stringify(data));

export const useCart = () => {
  const [cart, setCart] = useState({});

  const codes = useMemo(() => Object.keys(cart), [cart]);
  const productsQuery = useQuery({
    queryKey: ["cart/products", ...codes],
    queryFn: async () => {
      const res = await fetchProductByCodes({ codes });
      return res.data;
    },
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(cartKey)) || {};

    setCart(cart);
  }, []);

  const products = useMemo(() => {
    return (productsQuery.data || []).map((item) => {
      const cur = cart[item.code];
      const { form, product } = cur;
      return {
        code: item.code,
        form,
        product,
      };
    });
  }, [cart, productsQuery]);

  const updateAmount = (item, delta) => {
    const newItem = deepCopy(item);
    newItem.form.amount = item.form.amount + delta;
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

  const add = (item) => updateAmount(item, 0);
  const increment = (item) => updateAmount(item, 1);
  const decrement = (item) => {
    if (item.form.amount === 1) {
      remove(item);
      return;
    }

    updateAmount(item, -1);
  };

  const clear = () => {
    queryClient.invalidateQueries({ queryKey: ["products", ...codes] });
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
    products,
    cart,
    summary,
    add,
    remove,
    increment,
    decrement,
    clear,
    has,
    totalAmount,
    isLoading: productsQuery.isLoading,
  };
};
