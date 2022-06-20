import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "screens/home";
import { IoCartOutline, IoPerson } from "react-icons/io5";

function App() {
  const login = true;

  return (
    <div className="App">
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <p>テク</p>
            <p>クロ</p>
          </div>
        </div>
        <div className="menu">
          <ul>
            <li>Women</li>
            <li>Men</li>
            <li>Kids</li>
          </ul>
        </div>
        <div className="icon-menu">
          {login ? (
            <ul>
              <li>
                <div className="menu-icon">
                  <div>
                    <IoCartOutline size={24} />
                  </div>
                  <p>カート</p>
                </div>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <div className="menu-icon">
                  <div>
                    <IoPerson size={24} />
                  </div>
                  <p>カート</p>
                </div>
              </li>
            </ul>
          )}
        </div>
      </header>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Home />} />
          <Route path="/women" element={<Home />} />
          <Route path="/kids" element={<Home />} />
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
