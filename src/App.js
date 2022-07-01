import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "screens/home";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Home />} />
          <Route path="/women" element={<Home />} />
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
