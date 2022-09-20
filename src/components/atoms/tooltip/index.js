import { useState } from "react";
import styles from "./index.module.css";

export default function Tooltip ({ children, message }) {
  // const [show, setShow] = useState(false)

  return <div className={styles.tooltip}>
    <div className={[styles.tip, "tip"].join(" ")}>
      <p>{message}</p>
      <div className={styles.arrow} />
    </div>
    {children}
  </div>

}
