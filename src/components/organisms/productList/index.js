import Product from "components/organisms/product";
import styles from './index.module.css';

const ProductList = ({ products }) => {
  return (
    <div className={styles.container}>
      {products.map((_item, index) => {
        if (index % 3 !== 0) {
          return null;
        }

        const [first, second, third] = products.slice(index, index + 3);
        return (
          <div className={styles.row} key={_item.code}>
            {first && <Product item={first} />}
            {second && <Product item={second} />}
            {third && <Product item={third} />}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList
