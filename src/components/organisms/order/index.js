import { useMemo } from "react";
import classNames from "classnames";
import ProductItem from "components/organisms/productItem";
import { summarize } from "models/order";
import styles from "./index.module.css";

export default function Order({ order, onAdd, onRemove, onReduce }) {
  const summary = useMemo(() => summarize(order.products), [order]);

  return (
    <div key={order.id}>
      {order.orderedAt && <h2>{order.orderedAt.split(" ")[0]} 注文</h2>}
      <ul>
        {order.products.map((it) => {
          return (
            <li key={it.code}>
              <div>
                <ProductItem
                  item={it}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onReduce={onReduce}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.subtotal}>
        <div className={styles.subtotalLeft}></div>
        <div className={styles.subtotalRight}>
          {summary.map((item) => {
            return (
              <div className={styles.summary}>
                <div
                  className={classNames({
                    [styles.summaryLabel]: true,
                    [styles.summarySmall]: item.group === "small",
                    [styles.summaryMeidum]: item.group === "medium",
                    [styles.summaryLarge]: item.group === "large",
                  })}
                >
                  {item.label}
                </div>
                <div
                  className={classNames({
                    [styles.summaryValue]: true,
                    [styles.summarySmall]: item.group === "small",
                    [styles.summaryMeidum]: item.group === "medium",
                    [styles.summaryLarge]: item.group === "large",
                  })}
                >
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
