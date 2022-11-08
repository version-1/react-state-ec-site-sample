import { Provider } from "react-redux";
import { store } from "store";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "screens/home";
import Cart from "screens/cart";
import Login from "screens/login";
import Orders from "screens/accounts/orders";
import Items from "screens/items";
import Item from "screens/items/show";
import Payment from "screens/cart/payment";
import PaymentConfirmation from "screens/cart/payment/confirmation";
import PaymentComplete from "screens/cart/payment/complete";
import Account from "screens/accounts";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
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
              <Route path="" element={<Items />} />
              <Route path=":code" element={<Item />} />
            </Route>
          </Routes>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
