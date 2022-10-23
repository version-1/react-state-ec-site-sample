import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/templates/layout";
import Button from "components/atoms/button";
import Order from "components/organisms/order";
import { fetchProductByCodes } from "services/api";
import { useCart } from "hooks/useCart";
import styles from "./index.module.css";

function Cart({ user }) {
  const [products, setProducts] = useState([]);
  const { cart, codes, remove, increment, decrement } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const res = await fetchProductByCodes({ codes });
      const products = res.data.map((item) => {
        const cur = cart[item.code];
        const { form, product } = cur;
        return {
          code: item.code,
          form,
          product,
        };
      });
      setProducts(products);
    };

    init();
  }, [cart, codes]);

  return (
    <Layout user={user}>
      <div className={styles.container}>
        <h2 className={styles.title}>カート</h2>
        <div className={styles.content}>
          {codes.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>
                選択された商品はありません
              </p>
            </div>
          ) : (
            <Order
              order={{ products }}
              onReduce={(item) => {
                if (item.form.amount === 1) {
                  const res = window.confirm(
                    "商品をカートから削除します。よろしいですか？"
                  );
                  if (!res) {
                    return;
                  }
                }

                decrement(item);
              }}
              onAdd={(item) => {
                increment(item);
              }}
              onRemove={(item) => {
                const res = window.confirm(
                  "商品をカートから削除します。よろしいですか？"
                );
                if (!res) {
                  return;
                }

                remove(item);
              }}
            />
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
              navigate("/cart/payment");
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
