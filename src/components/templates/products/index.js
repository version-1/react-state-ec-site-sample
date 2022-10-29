import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import ProductList from "components/organisms/productList";
import Pagination from "components/organisms/pagination";
import Sidebar from "components/templates/sidebar";
import { fetchProducts } from "services/api";
import { uniq, serialize, deserialize } from "models/filter";
import style from "./index.module.css";

const Products = ({ defaultFilters = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState([]);
  const [text, setText] = useState(searchParams.get("text") || "");
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [filters, setFilters] = useState(() =>
    uniq([
      ...defaultFilters,
      ...deserialize(decodeURIComponent(searchParams.toString())),
    ])
  );

  const serializedFilters = useMemo(() => serialize(filters), [filters]);

  const fetch = async (params = {}) => {
    const res = await fetchProducts(params);
    if (!res.data) {
      return;
    }

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
    <section className={style.content}>
      <div className={style.main}>
        <Sidebar
          filters={filters}
          searchText={text}
          onChangeFilters={onChangeFilters}
          onSearch={(e) => {
            setText(e.target.value);
            fetch({ page, text: e.target.value, ...serializedFilters });
          }}
        />
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
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
};

export default Products;
