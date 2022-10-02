import styles from "./index.module.css";

export default function Card ({ payment }) {
  if (!payment) {
    return null
  }

  return (
    <div className={styles.card}>
      <input type="radio" checked onChange={() => {}} />
      <div className={styles.cardInfo}>
        <p className={styles.cardBrand}>{payment.brand}</p>
        <p className={styles.cardNumber}>**** **** **** {payment.cardNumberSuffix}</p>
        <p className={styles.cardDetails}>{payment.name} | {payment.expiredAt}</p>
      </div>
    </div>
  );
}
