import styles from "./index.module.css";

export default function Tooltip ({ children, message }) {
  return <div className={styles.tooltip}>
    <div className={[styles.tip, "tip"].join(" ")}>
      <p>{message}</p>
      <div className={styles.arrow} />
    </div>
    {children}
  </div>

}
