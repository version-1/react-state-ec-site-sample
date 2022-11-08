import { useNavigate } from "react-router-dom";
import Layout from "components/templates/layout";
import Button from "components/atoms/button";
import Order from "components/organisms/order";
import { useCart } from "hooks/useCart";
import styles from "./index.module.css";

function Cart({ user }) {
  const { products, remove, increment, decrement } = useCart();
  const navigate = useNavigate();

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
            onClick={() => navigate("/items")}
          />
          <Button
            label="支払い画面に進む"
            disabled={!products.length}
            onClick={() => {
              if (!user) {
                alert("支払いを完了させるにはログインが必要です。");
                navigate("/login");
                return;
              }
              navigate("/cart/payment");
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
