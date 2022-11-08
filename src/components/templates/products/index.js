import { useEffect, useMemo } from "react";
import ProductList from "components/organisms/productList";
import Pagination from "components/organisms/pagination";
import Sidebar from "components/templates/sidebar";
import { useFilter } from "hooks/useFilter";
import style from "./index.module.css";

const Products = () => {
  const filterContextValue = useFilter();
  const { data, fetch, meta } = filterContextValue;

  useEffect(() => {
    fetch();
  }, [fetch]);

  const count = useMemo(() => {
    const cnt = meta.page * meta.limit;
    return Math.min(cnt, meta.totalCount);
  }, [meta]);

  return (
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
  );
};

export default Products;
