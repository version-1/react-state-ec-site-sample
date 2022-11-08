import { useContext } from "react";
import { AuthContext } from "contexts";
import style from "./index.module.css";
import { Link } from "react-router-dom";
import { IoCartOutline, IoPerson, IoEnterOutline } from "react-icons/io5";
import DropDownMenu from "components/organisms/dropdown";
import icon from "assets/logo-dark.png";

const dropdownMenuList = ({ onLogout }) => [
  {
    key: "profile",
    to: "/accounts",
    label: "プロフィール",
  },
  {
    key: "order",
    to: "/accounts/orders",
    label: "注文履歴",
  },
  {
    key: "logout",
    label: "ログアウト",
    onClick: () => {
      onLogout();
      window.location.href = "/#/items";
    },
    style: "disruptive",
  },
];

const Layout = ({ menu = true, publicPage, children }) => {
  const {
    data: { user, isLogin },
    logout,
  } = useContext(AuthContext);
  const items = dropdownMenuList({ onLogout: logout });

  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.logoContainer}>
          <Link to="/" reloadDocument>
            <img src={icon} alt="Button" />
          </Link>
        </div>
        {menu ? (
          <div className={style.menu}>
            <ul className={style.menuList}>
              <li className={style.menuItem}>
                <Link
                  className={style.menuItemText}
                  to="/items/women"
                  reloadDocument
                >
                  Women
                </Link>
              </li>
              <li className={style.menuItem}>
                <Link
                  className={style.menuItemText}
                  to="/items/men"
                  reloadDocument
                >
                  Men
                </Link>
              </li>
              <li className={style.menuItem}>
                <Link
                  className={style.menuItemText}
                  to="/items/kids"
                  reloadDocument
                >
                  Kids
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
        {menu ? (
          <div className={style.iconMenu}>
            {isLogin ? (
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
                  <div className={style.iconMenuItemContent}>
                    <DropDownMenu
                      trigger={
                        <>
                          <div>
                            <IoPerson size={24} />
                          </div>
                          <p>アカウント</p>
                        </>
                      }
                      items={items}
                    />
                  </div>
                </li>
              </ul>
            ) : (
              <ul className={style.iconMenuList}>
                <li className={style.iconMenuItem}>
                  <Link to="/cart" reloadDocument>
                    <div className={style.iconMenuItemContent}>
                      <div>
                        <IoCartOutline size={24} />
                      </div>
                      <p>カート</p>
                    </div>
                  </Link>
                </li>
                <li className={style.iconMenuItem}>
                  <Link to="/login" reloadDocument>
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
        ) : null}
      </header>
      {publicPage || user ? children : null}
    </div>
  );
};

export default Layout;
