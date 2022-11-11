import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { FilterContext } from "contexts";
import ProductList from "components/organisms/productList";
import Pagination from "components/organisms/pagination";
import Sidebar from "components/templates/sidebar";
import { useFilter } from "hooks/useFilter";
import { categoryList } from "models/filter";
import style from "./index.module.css";

const Products = () => {
  const { hash, pathname } = useLocation();
  const filterContextValue = useFilter();
  const { data, fetch, filters, meta, update, paginate } = filterContextValue;

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    const defaultFilters = {
      men: categoryList[0],
      women: categoryList[1],
      kids: categoryList[2],
    };
    const getKey = (path) => path.split("?")[0].split("/").slice(-1)[0];
    const key = getKey(pathname || hash);
    const defaultFilter = defaultFilters[key];

    const _filters = filters.map(
      (item) =>
        item.group !== "categories" &&
        !Object.keys(defaultFilters).includes(item.value)
    );

    if (defaultFilter) {
      update([
        {
          group: "page",
          value: 1,
        },
        {
          group: "text",
          value: "",
        },
        defaultFilter,
        ..._filters
      ]);
    }
  }, [pathname, hash]);

  const count = useMemo(() => {
    const cnt = meta.page * meta.limit;
    return Math.min(cnt, meta.totalCount);
  }, [meta]);

  return (
    <FilterContext.Provider value={filterContextValue}>
      <section className={style.content}>
        <div className={style.main}>
          <Sidebar />
          <div className={style.products}>
            <div className={style.productsHeader}>
              <div>
                <p>
                  {count} / {meta?.totalCount} 件
                </p>
              </div>
              <div>
                <Pagination />
              </div>
            </div>
            <ProductList products={data} />
          </div>
        </div>
      </section>
    </FilterContext.Provider>
  );
};

export default Products;
