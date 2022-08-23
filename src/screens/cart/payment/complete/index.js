import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Layout from "components/templates/layout";
import Button from "components/atoms/button";

function PaymentComplete() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.message}>支払いを完了しました</h2>
          <div className={styles.buttons}>
            <Button
              label="カートに戻る"
              variant="outline"
              style={{ marginRight: "8px" }}
              onClick={() => navigate("/cart")}
            />
            <Button
              label="購入履歴を確認する"
              onClick={() => navigate("/accounts/order")}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentComplete;
