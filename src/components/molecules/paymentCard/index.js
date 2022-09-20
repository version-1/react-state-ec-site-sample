import styles from "./index.module.css";

export default function Card () {
  return (
    <div className={styles.card}>
      <input type="radio" checked onChange={() => {}} />
      <div className={styles.cardInfo}>
        <p className={styles.cardBrand}>VISA</p>
        <p className={styles.cardNumber}>**** **** **** 1234</p>
        <p className={styles.cardDetails}>TECH TARO | 08 / 2025</p>
      </div>
    </div>
  );
}
