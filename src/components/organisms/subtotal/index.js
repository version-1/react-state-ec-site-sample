import styles from "./index.module.css";
import classNames from "classnames";

export default function Subtotal({ summary }) {
  return (
    <div className={styles.container}>
      {summary.map((item) => {
        return (
          <div key={item.label} className={styles.summary}>
            <div
              className={classNames({
                [styles.label]: true,
                [styles.summarySmall]: item.group === "small",
                [styles.summaryMeidum]: item.group === "medium",
                [styles.summaryLarge]: item.group === "large",
              })}
            >
              {item.label}
            </div>
            <div
              className={classNames({
                [styles.label]: true,
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
  );
}
