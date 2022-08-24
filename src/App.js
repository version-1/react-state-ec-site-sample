import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "screens/home";
import Men from "screens/men";
import Women from "screens/women";
import Kids from "screens/kids";
import Item from "screens/items";
import Cart from "screens/cart";
import Payment from "screens/cart/payment";
import PaymentConfirmation from "screens/cart/payment/confirmation";
import PaymentComplete from "screens/cart/payment/complete";
import { fetchUser } from "services/api";

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    const init = async() => {
     const res = await fetchUser()
      setUser(res.data)
    }

    init()
  }, [])

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/cart/payment" element={<Payment user={user} />} />
          <Route
            path="/cart/payment/confirmation"
            element={<PaymentConfirmation />}
          />
          <Route
            path="/cart/payment/complete"
            element={<PaymentComplete />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/accounts" element={<Home />}>
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
