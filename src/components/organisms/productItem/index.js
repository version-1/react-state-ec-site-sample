import styles from "./index.module.css";
import { assetURL } from "constants/index";
import { IoAdd, IoCloseCircleSharp, IoRemove } from "react-icons/io5";

export default function ProductItem({ item, onRemove, onAdd, onReduce }) {
  const { form, product } = item;
  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <div className={styles.left}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={assetURL + product.imageURL}
              alt={product.title}
            />
          </div>
        </div>
        <div className={styles.center}>
          <h3 className={styles.productTitle}>{product.title}</h3>
          <p>カラー: {form.color} </p>
          <p>サイズ: {form.size}</p>
        </div>
        <div className={styles.right}>
          <p className={styles.price}>¥ {product.price.toLocaleString()}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.action}>
            {onAdd && onReduce && (
              <p className={styles.manipulateAmount}>
                <IoRemove
                  className={styles.icon}
                  size={16}
                  onClick={() => onReduce(item)}
                />
                {form.amount}
                <IoAdd
                  className={styles.icon}
                  size={16}
                  onClick={() => onAdd(item)}
                />
              </p>
            )}
            {onRemove && (
              <p className={styles.delete}>
                <IoCloseCircleSharp
                  className={styles.icon}
                  size={16}
                  onClick={() => onRemove(item)}
                />
                <label
                  className={styles.deleteLabel}
                  onClick={() => onRemove(item)}
                >
                  削除
                </label>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
