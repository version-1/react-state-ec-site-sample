import { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import Slide from "components/organisms/slide";
import Product from "components/organisms/product";
import Pagination from "components/organisms/pagination";
import Sidebar from "components/templates/sidebar";
import Layout from "components/templates/layout";
import { fetchProducts } from "services/api";
import { serialize, deserialize } from "models/filter";
import style from "./index.module.css";

const Products = ({ defaultFilters = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState([]);
  const [text, setText] = useState(searchParams.get("text") || "");
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [filters, setFilters] = useState(() => [
    ...defaultFilters,
    ...deserialize(decodeURIComponent(searchParams.toString())),
  ]);

  console.log("filters ==============", filters);
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
    <Layout>
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
                  <Pagination
                    page={page}
                    maxPage={meta?.maxPage}
                    totalCount={meta?.totalCount}
                    limit={meta?.limit}
                    onClick={(page) => {
                      fetch({
                        page,
                        text,
                        ...serialize(filters),
                      });
                    }}
                  />
                </div>
              </div>
              <div className={style.productsContent}>
                {products.map((_item, index) => {
                  if (index % 3 !== 0) {
                    return null;
                  }

                  const [first, second, third] = products.slice(
                    index,
                    index + 3
                  );
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
    </Layout>
  );
};

export default Products;
