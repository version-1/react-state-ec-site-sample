import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
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
  hasToken,
  fetchUser,
  setErrorHandler,
  setClearTokenHandler,
} from "services/api";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const init = async () => {
      setClearTokenHandler(() => {
        setUser(undefined);
      });

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
          setUser(res.data);
        }
      }
    };

    init();
  }, [setUser]);

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home user={user} />} caseSensitive />
          <Route path="/cart">
            <Route path="" element={<Cart user={user} />} />
            <Route path="payment" element={<Payment user={user} />} />
            <Route
              path="payment/confirmation"
              element={<PaymentConfirmation user={user} />}
            />
            <Route
              path="payment/complete"
              element={<PaymentComplete user={user} />}
            />
          </Route>
          <Route
            path="/login"
            element={
              <Login
                user={user}
                onLogin={(user) => {
                  setUser(user);
                }}
              />
            }
          />
          <Route path="/accounts">
            <Route path="" element={<Account user={user} />} />
            <Route path="orders" element={<Orders user={user} />} />
          </Route>
          <Route path="/items">
            <Route
              path=""
              element={
                <Layout user={user}>
                  <Products />
                </Layout>
              }
            />
            <Route
              path="men"
              element={
                <Layout user={user}>
                  <Products />
                </Layout>
              }
            />
            <Route
              path="women"
              element={
                <Layout user={user}>
                  <Products />
                </Layout>
              }
            />
            <Route
              path="kids"
              element={
                <Layout user={user}>
                  <Products />
                </Layout>
              }
            />
            <Route path=":code" element={<Item user={user} />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
