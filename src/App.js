import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "contexts";
import Layout from "components/templates/layout";
import Products from "components/templates/products";
import Home from "screens/home";
import Item from "screens/items";
import Cart from "screens/cart";
import Login from "screens/login";
import Orders from "screens/accounts/orders";
import Payment from "screens/cart/payment";
import PaymentConfirmation from "screens/cart/payment/confirmation";
import PaymentComplete from "screens/cart/payment/complete";
import Account from "screens/accounts";
import {
  clearToken,
  setToken,
  hasToken,
  fetchUser,
  setErrorHandler,
} from "services/api";

function App() {
  const [auth, setAuth] = useState({
    user: undefined,
    isLogin: false,
  });

  const updateAuth = useCallback(
    (value) =>
      setAuth({
        ...auth,
        ...value,
      }),
    [auth, setAuth]
  );

  const login = useCallback(
    (user, token) => {
      if (token) {
        setToken(token);
      }
      updateAuth({ user, isLogin: true });
    },
    [updateAuth]
  );

  const logout = useCallback(() => {
    clearToken();
    updateAuth({ user: undefined, isLogin: false });
  }, [updateAuth]);

  useEffect(() => {
    const init = async () => {
      setErrorHandler((e) => {
        if (e.status === 403) {
          clearToken();
          const { hash } = window.location;
          if (hash.startsWith("#/accounts")) {
            window.location.href = "#/items";
          }
          return;
        }

        console.error(e);
        alert("リクエストに失敗しました");
      });

      if (hasToken) {
        const res = await fetchUser();
        if (res.data) {
          login(res.data);
        }
      }
    };

    init();
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          data: auth,
          login,
          logout,
        }}
      >
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} caseSensitive />
            <Route path="/cart">
              <Route path="" element={<Cart />} />
              <Route path="payment" element={<Payment />} />
              <Route
                path="payment/confirmation"
                element={<PaymentConfirmation />}
              />
              <Route path="payment/complete" element={<PaymentComplete />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="/accounts">
              <Route path="" element={<Account />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/items">
              <Route
                path=""
                element={
                  <Layout publicPage>
                    <Products />
                  </Layout>
                }
              />
              <Route
                path="men"
                element={
                  <Layout publicPage>
                    <Products />
                  </Layout>
                }
              />
              <Route
                path="women"
                element={
                  <Layout publicPage>
                    <Products />
                  </Layout>
                }
              />
              <Route
                path="kids"
                element={
                  <Layout publicPage>
                    <Products />
                  </Layout>
                }
              />
              <Route path=":code" element={<Item />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
