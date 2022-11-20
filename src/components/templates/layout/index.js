import style from "./index.module.css";
import { Link } from "react-router-dom";
import { IoCartOutline, IoPerson, IoEnterOutline } from "react-icons/io5";
import { useUser } from "hooks/useUser";
import DropDownMenu from "components/organisms/dropdown";
import { clearToken } from "services/api";
import icon from "assets/logo-dark.png";

const dropdownMenuList = () => [
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
      clearToken();
      window.location.href = "/";
    },
    style: "disruptive",
  },
];

const Layout = ({ guest, children }) => {
  const items = dropdownMenuList();
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.logoContainer}>
          <Link to="/">
            <img src={icon} alt="Button" />
          </Link>
        </div>
        {guest ? null : (
          <div className={style.menu}>
            <ul className={style.menuList}>
              <li className={style.menuItem}>
                <Link className={style.menuItemText} to="/items/women">
                  Women
                </Link>
              </li>
              <li className={style.menuItem}>
                <Link className={style.menuItemText} to="/items/men">
                  Men
                </Link>
              </li>
              <li className={style.menuItem}>
                <Link className={style.menuItemText} to="/items/kids">
                  Kids
                </Link>
              </li>
            </ul>
          </div>
        )}
        {guest ? null : (
          <div className={style.iconMenu}>
            {user ? (
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
        )}
      </header>
      {children}
    </div>
  );
};

export default Layout;
