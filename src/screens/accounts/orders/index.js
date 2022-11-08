import { useEffect, useState } from "react";
import Layout from "components/templates/layout";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { fetchOrders } from "services/api";
import Order from "components/organisms/order";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const init = async () => {
      const res = await fetchOrders();
      if (res.data) {
        setOrders(res.data);
      }
    };

    init();
  }, [navigate]);

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>注文履歴</h2>
        <div className={styles.body}>
          {orders.length ? (
            orders.map((item) => <Order key={item.id} order={item} />)
          ) : (
            <p className={styles.empty}>注文の履歴がありません</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
