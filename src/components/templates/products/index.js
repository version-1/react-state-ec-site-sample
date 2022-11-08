import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "components/organisms/productList";
import Pagination from "components/organisms/pagination";
import Sidebar from "components/templates/sidebar";
import { useFilter } from "hooks/useFilter";
import { categoryList } from "models/filter";
import style from "./index.module.css";

const Products = () => {
  const { hash, pathname } = useLocation();
  const {
    data,
    fetch,
    filters,
    tags,
    meta,
    update,
    add,
    search,
    remove,
    reset,
    paginate,
    has,
  } = useFilter();

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
        ...filters
      ]);
    }
  }, [pathname, hash]);

  const count = useMemo(() => {
    const cnt = meta.page * meta.limit;
    return Math.min(cnt, meta.totalCount);
  }, [meta]);

  return (
    <section className={style.content}>
      <div className={style.main}>
        <Sidebar
          filters={filters}
          tags={tags}
          onSearch={search}
          onReset={reset}
          onRemove={remove}
          onSelect={(item) => {
            if (has(item)) {
              remove(item)
            } else {
              add(item)
            }
          }}
        />
        <div className={style.products}>
          <div className={style.productsHeader}>
            <div>
              <p>
                {count} / {meta?.totalCount} 件
              </p>
            </div>
            <div>
              <Pagination
                page={meta?.page}
                maxPage={meta?.maxPage}
                totalCount={meta?.totalCount}
                limit={meta?.limit}
                onClick={paginate}
              />
            </div>
          </div>
          <ProductList products={data} />
        </div>
      </div>
    </section>
  );
};

export default Products;
