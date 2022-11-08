import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./index.module.css";
import { Link } from "react-router-dom";
import { IoCartOutline, IoPerson, IoEnterOutline } from "react-icons/io5";
import Loader from "components/atoms/loader";
import DropDownMenu from "components/organisms/dropdown";
import icon from "assets/logo-dark.png";
import { clearToken, hasToken, fetchUser, setErrorHandler } from "services/api";
import { login, logout, loaded } from "features/auth";

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
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    clearToken();
    dispatch(logout());
  };

  const items = dropdownMenuList({ onLogout });

  useEffect(() => {
    const init = async () => {
      setErrorHandler((e) => {
        if (e.status === 403) {
          clearToken();
          const { hash } = window.location;
          if (hash.startsWith("#/accounts")) {
            window.location.href = "#/items";
          }
          return;
        }

        console.error(e);
        alert("リクエストに失敗しました");
      });

      try {
        if (hasToken()) {
          const res = await fetchUser();
          if (res.data) {
            dispatch(login({ user: res.data }));
          }
        }
      } finally {
        dispatch(loaded());
      }
    };

    init();
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.logoContainer}>
          <Link to="/" reloadDocument>
            <img src={icon} alt="Button" />
          </Link>
        </div>
        {menu ? (
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
        ) : null}
      </header>
      {publicPage || user ? children : null}
    </div>
  );
};

export default Layout;
