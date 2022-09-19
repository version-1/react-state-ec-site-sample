import style from "./index.module.css";
import { Link } from "react-router-dom";
import { IoCartOutline, IoPerson, IoEnterOutline } from "react-icons/io5";

const Layout = ({ guest, user, children }) => {
  // INFO: サーバー側で固定でユーザを返すので、トークンの有無だけでログインを判断
  const login = !!(localStorage.getItem("token") && user);

  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.logoContainer}>
          <Link to="/">
            <div className={style.logo}>
              <p className={style.logoText}>テク</p>
              <p className={style.logoText}>クロ</p>
            </div>
          </Link>
        </div>
        {guest ? null : (
          <div className={style.menu}>
            <ul className={style.menuList}>
              <li className={style.menuItem}>
                <Link className={style.menuItemText} to="/women">
                  Women
                </Link>
              </li>
              <li className={style.menuItem}>
                <Link className={style.menuItemText} to="/men">
                  Men
                </Link>
              </li>
              <li className={style.menuItem}>
                <Link className={style.menuItemText} to="/kids">
                  Kids
                </Link>
              </li>
            </ul>
          </div>
        )}
        {guest ? null : (
          <div className={style.iconMenu}>
            {login ? (
              <ul className={style.iconMenuList}>
                <li className={style.iconMenuItem}>
                  <Link to="/cart">
                    <div className={style.iconMenuItemContent}>
                      <div>
                        <IoCartOutline size={24} />
                      </div>
                      <p>カート</p>
                    </div>
                  </Link>
                </li>
                <li className={style.iconMenuItem}>
                  <Link to="/cart">
                    <div className={style.iconMenuItemContent}>
                      <div>
                        <IoPerson size={24} />
                      </div>
                      <p>アカウント</p>
                    </div>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className={style.iconMenuList}>
                <li className={style.iconMenuItem}>
                  <Link to="/account">
                    <div className={style.iconMenuItemContent}>
                      <div>
                        <IoEnterOutline size={24} />
                      </div>
                      <p>ログイン</p>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </header>
      {children}
    </div>
  );
};

export default Layout;
