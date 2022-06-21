import { useEffect, useMemo, useState } from "react";
import {
  IoSearchOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import Slide from "components/organisms/slide";
import Product from "components/organisms/product";
import Sidebar from "components/templates/sidebar";
import { fetchProducts } from "services/api";
import { serialize, deserialize } from "models/filter";
import style from "./index.module.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState([]);
  const [text, setText] = useState(searchParams.get("text") || "");
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [filters, setFilters] = useState(() =>
    deserialize(decodeURIComponent(searchParams.toString()))
  );

  const serializedFilters = useMemo(() => serialize(filters), [filters]);

  const fetch = async (params = {}) => {
    const res = await fetchProducts(params);

    const { page } = params;
    const { data, ...rest } = res;
    const { limit, totalCount } = rest;

    const maxPage = Math.floor(totalCount / limit) + 1;

    setProducts(data);
    setMeta({ ...rest, maxPage });
    setPage(page);
    const serialziedParams = qs.stringify(params);
    setSearchParams(serialziedParams);
  };

  useEffect(() => {
    fetch({ page, text, ...serializedFilters });
  }, []);

  const pagination = useMemo(() => {
    if (!meta) {
      return [];
    }

    const handleClick = (p) => async () => {
      fetch({
        page: p,
        text,
        ...serialize(filters),
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
  }, [page, filters, meta, text]);

  const onChangeFilters = (params) => {
    const _params = serialize(params);
    fetch({ page, text, ..._params });
    setFilters(params);
  };

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
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                fetch({ page, text: e.target.value, ...serializedFilters });
              }}
            />
            <a href="#!" className={style.searchFormButton}>
              <IoSearchOutline size="32" color="white" />
            </a>
          </div>
        </div>
        <div className={style.main}>
          <Sidebar filters={filters} onChangeFilters={onChangeFilters} />
          <div className={style.products}>
            <div className={style.productsHeader}>
              <div>
                <p>
                  {count} / {meta.totalCount} 件
                </p>
              </div>
              <div>
                <ul className={style.pagination}>
                  {page > 1 ? (
                    <li style={{ cursor: "pointer" }}>
                      <IoChevronBack
                        size={24}
                        onClick={() => {
                          fetch({ page: page - 1, text, ...serializedFilters });
                        }}
                      />
                    </li>
                  ) : null}
                  {pagination.map((item) => {
                    return (
                      <li
                        key={`paigination-${item.label}`}
                        className={[
                          style.paginationItem,
                          String(page) === String(item.value)
                            ? style.paginationActiveItem
                            : undefined,
                        ].join(" ")}
                      >
                        <p onClick={item.onClick}>{item.label}</p>
                      </li>
                    );
                  })}
                  {meta?.maxPage > page ? (
                    <li style={{ cursor: "pointer" }}>
                      <IoChevronForward
                        size={24}
                        onClick={() => {
                          fetch({ page: page + 1, text, ...serializedFilters });
                        }}
                      />
                    </li>
                  ) : null}
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
                  <div className={style.productListRow} key={_item.imageURL}>
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
