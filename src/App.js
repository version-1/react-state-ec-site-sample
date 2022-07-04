import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "screens/home";
import Men from "screens/men";
import Women from "screens/women";
import Kids from "screens/kids";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/accounts" element={<Home />}>
            <Route path="edit" element={<Home />} />
            <Route path="email/edit" element={<Home />} />
          </Route>
          <Route path="/items" element={<Home />}>
            <Route path=":id" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
