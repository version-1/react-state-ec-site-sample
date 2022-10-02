import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
import classNames from "classnames";
import Layout from "components/templates/layout";
import Button from "components/atoms/button";
import { fetchProductByCodes } from "services/api";
import { useCart } from "hooks/useCart";
import styles from "./index.module.css";
import { assetURL } from "constants/index";
import ProductList from "components/organisms/productList";

function Cart({ user }) {
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
    <Layout user={user}>
      <div className={styles.container}>
        <h2 className={styles.title}>カート</h2>
        <div className={styles.content}>
          {products.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>
                選択された商品はありません
              </p>
            </div>
          ) : (
            <div className={styles.cartContainer}>
              <div className={styles.catContent}>
                {products.map((item) => {
                  const cur = cart[item.code];
                  const { form, product } = cur;

                  return (
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
                        <p>数量: {form.amount}</p>
                      </div>
                      <div className={styles.right}>
                        <p className={styles.price}>
                          ¥ {product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className={styles.right}>
                        <div className={styles.action}>
                          <p className={styles.delete}>
                            <IoCloseCircleSharp size={16} />
                            <label className={styles.deleteLabel}>削除</label>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
          )}
        </div>
        <div className={styles.buttons}>
          <Button
            label="買い物を続ける"
            variant="outline"
            style={{ marginRight: "8px" }}
            onClick={() => navigate("/")}
          />
          <Button
            label="支払い画面に進む"
            disabled={!products.length}
            onClick={() => {
              navigate("/cart/payment")
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
