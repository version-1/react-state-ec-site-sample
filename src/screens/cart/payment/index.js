import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/templates/layout";
import styles from "./index.module.css";
import { useCart } from "hooks/useCart";
import Subtotal from "components/organisms/subtotal";
import Button from "components/atoms/button";
import { assetURL } from "constants/index";
import { fetchProductByCodes } from "services/api";

function TextField(props) {
  const { label, ...rest } = props;

  return (
    <div className={styles.textFieldContainer}>
      {label && <label className={styles.textFieldLabel}>{label}</label>}
      <TextInput {...rest} />
    </div>
  );
}
function TextInput(props) {
  return <input className={styles.input} type="text" {...props} />;
}

function Payment() {
  const [products, setProducts] = useState([]);
  const { summary, cart, codes } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const res = await fetchProductByCodes({ codes });
      setProducts(res.data || []);
    };

    init();
  }, [codes]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.section}>
            <h2>1. お届け情報の入力</h2>
            <div>
              <h3 className={styles.fieldTitle}>氏名</h3>
              <div className={styles.twinForm}>
                <TextField label="姓" />
                <TextField label="名" />
              </div>
            </div>
            <div>
              <div className={styles.twinForm}>
                <TextField label="セイ" />
                <TextField label="メイ" />
              </div>
            </div>
            <div>
              <h3 className={styles.fieldTitle}>郵便番号</h3>
              <TextField />
            </div>
            <div>
              <h3 className={styles.fieldTitle}>都道府県</h3>
              <TextField />
            </div>
            <div>
              <h3 className={styles.fieldTitle}>市区町村</h3>
              <TextField />
            </div>
            <div>
              <h3 className={styles.fieldTitle}>番地</h3>
              <TextField />
            </div>
            <div>
              <h3 className={styles.fieldTitle}>
                アパート・マンション・部屋番号
              </h3>
              <TextField />
            </div>
          </div>
          <div className={styles.section}>
            <h2>2. 支払い方法</h2>
            <div>
              <h2>クレジットカード</h2>
              <div className={styles.card}>
                <input type="radio" checked />
                <div className={styles.cardInfo}>
                  <p className={styles.cardBrand}>VISA</p>
                  <p className={styles.cardNumber}>**** **** **** 1234</p>
                  <p className={styles.cardDetails}>TECH TARO | 08 / 2025</p>
                </div>
              </div>
              <div className={styles.newCard}>
                <a>+ 新しいカードを登録する</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightSection}>
            <h3 className={styles.rightSectionTitle}>注文商品</h3>
            {products.map((item) => {
              const cur = cart[item.code];
              const { form, product } = cur;

              return (
                <div className={styles.product}>
                  <div className={styles.productLeft}>
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.image}
                        src={assetURL + product.imageURL}
                        alt={product.title}
                      />
                    </div>
                  </div>
                  <div className={styles.productRight}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p>カラー: {form.color} </p>
                    <p>サイズ: {form.size}</p>
                    <p>数量: {form.amount}</p>
                    <p className={styles.productPrice}>
                      ¥ {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.rightSection}>
            <h3 className={styles.rightSectionTitle}>小計</h3>
            <div className={styles.summary}>
              <Subtotal summary={summary} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <Button
          label="カートに戻る"
          variant="outline"
          style={{ marginRight: "8px" }}
          onClick={() => navigate("/cart")}
        />
        <Button
          label="支払い確認画面に進む"
          onClick={() => navigate("/cart/payment/confirmation")}
        />
      </div>
    </Layout>
  );
}

export default Payment;
