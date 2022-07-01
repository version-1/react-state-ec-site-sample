import style from "./index.module.css";
import { Link } from "react-router-dom";
import { IoCartOutline, IoPerson } from "react-icons/io5";

const login = true;
const Layout = ({ children }) => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.logoContainer}>
          <div className={style.logo}>
            <p className={style.logoText}>テク</p>
            <p className={style.logoText}>クロ</p>
          </div>
        </div>
        <div className={style.menu}>
          <ul className={style.menuList}>
            <li className={style.menuItem}>
              <Link to="/women">Women</Link>
            </li>
            <li className={style.menuItem}>
              <Link to="/men">Men</Link>
            </li>
          </ul>
        </div>
        <div className={style.iconMenu}>
          {login ? (
            <ul className={style.iconMenuList}>
              <li className={style.iconMenuItem}>
                <div className="menu-icon">
                  <div>
                    <IoCartOutline size={24} />
                  </div>
                  <p>カート</p>
                </div>
              </li>
            </ul>
          ) : (
            <ul className={style.iconMenuList}>
              <li className={style.iconMenuItem}>
                <div className="menu-icon">
                  <div>
                    <IoPerson size={24} />
                  </div>
                  <p>ログイン</p>
                </div>
              </li>
            </ul>
          )}
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
