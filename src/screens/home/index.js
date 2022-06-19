import { useEffect, useMemo, useState } from "react";
import {
  IoSearchOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import Slide from "components/organisms/slide";
import Product from "components/organisms/product";
import Sidebar from "components/templates/sidebar";
import { fetchProducts } from "services/api";
import style from "./index.module.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([]);

  const fetch = async ({ page } = {}) => {
    const res = await fetchProducts({ page });

    const { data, ...rest } = res;

    setProducts(data);
    setMeta(rest);
    setPage(page);
  };

  useEffect(() => {
    fetch();
  }, []);

  const pagination = useMemo(() => {
    if (!meta) {
      return [];
    }

    const handleClick = (p) => async () => {
      fetch({
        page: p,
      });
    };

    const res = [];
    let i = 0;
    let _page = 1;
    while (i < meta.totalCount) {
      res.push({
        label: _page,
        value: _page,
        onClick: handleClick(_page),
        active: false,
      });

      _page = _page + 1;
      i = i + meta.limit;
    }

    return res;
  }, [page, filters, meta]);

  const count = useMemo(() => {
    const cnt = meta.page * meta.limit;
    return Math.min(cnt, meta.totalCount);
  }, [meta]);

  return (
    <div className={style.container}>
      <section>
        <Slide />
      </section>
      <section className={style.content}>
        <div className={style.contentHeader}>
          <h2 className={style.productListTitle}>商品検索</h2>
          <div className={style.searchForm}>
            <input
              className={style.searchFormInput}
              type="text"
              placeholder="キーワードで探す"
            />
            <a href="#!" className={style.searchFormButton}>
              <IoSearchOutline size="32" color="white" />
            </a>
          </div>
        </div>
        <div className={style.main}>
          <Sidebar filters={filters} onChangeFilters={setFilters} />
          <div className={style.products}>
            <div className={style.productsHeader}>
              <div>
                <p>
                  {count} / {meta.totalCount} 件
                </p>
              </div>
              <div>
                <ul className={style.pagination}>
                  <li>
                    <IoChevronBack
                      size={24}
                      onClick={() => {
                        if (page > 1) {
                          fetch({ page: page - 1 });
                        }
                      }}
                    />
                  </li>
                  {pagination.map((item) => {
                    return (
                      <li
                        key={`paigination-${item.label}`}
                        className={[
                          style.paginationItem,
                          page === item.value
                            ? style.paginationActiveItem
                            : undefined,
                        ].join(" ")}
                      >
                        <p onClick={item.onClick}>{item.label}</p>
                      </li>
                    );
                  })}
                  <li>
                    <IoChevronForward
                      size={24}
                      onClick={() => {
                        const maxPage = Math.floor(
                          meta.totalCount / meta.limit
                        );
                        if (maxPage > page) {
                          fetch({ page: page + 1 });
                        }
                      }}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className={style.productsContent}>
              {products.map((_item, index) => {
                if (index % 3 !== 0) {
                  return null;
                }

                const [first, second, third] = products.slice(index, index + 3);
                return (
                  <div className={style.productListRow}>
                    {first && <Product item={first} />}
                    {second && <Product item={second} />}
                    {third && <Product item={third} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
