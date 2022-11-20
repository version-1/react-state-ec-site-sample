import "./App.css";
import { useEffect } from "react";
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
import { clearToken, setErrorHandler } from "services/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
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
    };

    init();
  }, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
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
            <Route path="/login" element={<Login />} />
            <Route path="/accounts">
              <Route path="" element={<Account />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/items">
              <Route
                path=""
                element={
                  <Layout>
                    <Products />
                  </Layout>
                }
              />
              <Route
                path="men"
                element={
                  <Layout>
                    <Products />
                  </Layout>
                }
              />
              <Route
                path="women"
                element={
                  <Layout>
                    <Products />
                  </Layout>
                }
              />
              <Route
                path="kids"
                element={
                  <Layout>
                    <Products />
                  </Layout>
                }
              />
              <Route path=":code" element={<Item />} />
            </Route>
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
