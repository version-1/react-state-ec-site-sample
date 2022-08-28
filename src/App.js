import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "screens/home";
import Men from "screens/men";
import Women from "screens/women";
import Kids from "screens/kids";
import Item from "screens/items";
import Cart from "screens/cart";
import Login from "screens/accounts/login";
import Payment from "screens/cart/payment";
import PaymentConfirmation from "screens/cart/payment/confirmation";
import PaymentComplete from "screens/cart/payment/complete";
import { fetchUser } from "services/api";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const init = async () => {
      const res = await fetchUser();
      setUser(res.data);
    };

    init();
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} caseSensitive />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/cart">
            <Route path="" element={<Cart />} />
            <Route path="payment" element={<Payment user={user} />} />
            <Route
              path="payment/confirmation"
              element={<PaymentConfirmation />}
            />
            <Route path="payment/complete" element={<PaymentComplete />} />
          </Route>
          <Route path="/accounts">
            <Route path="login" element={<Login />} />
            <Route path="edit" element={<Home />} />
            <Route path="email/edit" element={<Home />} />
          </Route>
          <Route path="/items">
            <Route path=":code" element={<Item />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
