import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "components/templates/layout";
import Dropdown from "components/atoms/select";
import Button from "components/atoms/button";
import { fetchProduct } from "services/api";
import { assetURL } from "constants/index";
import { sizeList, colorList } from "models/filter";
import styles from "./index.module.css";

function Item() {
  const { code } = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    if (!code) {
      return;
    }

    const init = async () => {
      const res = await fetchProduct({ code });
      setItem(res.data);
    };

    init();
  }, [code]);

  const amounts = useMemo(() => {
    return new Array(10)
      .fill("")
      .map((_, index) => ({ label: index + 1, value: index + 1 }));
  }, [item]);

  if (!item) {
    return null;
  }

  console.log(item);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            className={styles.featuredImage}
            src={assetURL + item.imageURL}
            alt={item.title}
          />

          <div className={styles.imageList}>
            <h3 className={styles.label}>商品イメージ</h3>
            <ul className={styles.images}>
              <li>
                <div className={styles.image}></div>
              </li>
              <li>
                <div className={styles.image}></div>
              </li>
              <li>
                <div className={styles.image}></div>
              </li>
              <li>
                <div className={styles.image}></div>
              </li>
            </ul>
          </div>
          <div className={styles.description}>
            <h3 className={styles.descriptionHeading}>この商品について</h3>
            <div className={styles.descriptionSection}>
              <h4 className={styles.descriptionTitle}>概要</h4>
              <div className={styles.descriptionBody}>
                この商品に関する概要はありません
              </div>
            </div>
            <div className={styles.descriptionSection}>
              <h4 className={styles.descriptionTitle}>商品詳細</h4>
              <div className={styles.descriptionBody}>
                この商品に関する詳細はありません
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.form}>
            <div className={styles.row}>
              <h3 className={styles.label}>カラー</h3>
              <div>
                <ul className={styles.colors}>
                  {colorList.map((item) => {
                    return (
                      <div
                        className={styles.color}
                        style={{ background: item.value }}
                      ></div>
                    );
                  })}
                </ul>
              </div>
              <div className={styles.row}>
                <h3 className={styles.label}>サイズ</h3>
                <div>
                  <ul className={styles.sizes}>
                    {sizeList.map((item) => {
                      return <div className={styles.size}>{item.label}</div>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <p className={styles.price}>¥ {item.price.toLocaleString()}</p>
            </div>
            <div className={styles.row}>
              <h3 className={styles.label}>数量</h3>
              <div className={styles.dropdown}>
                <Dropdown data={amounts} />
              </div>
            </div>
            <div>
              <Button label="カートに入れる" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Item;
