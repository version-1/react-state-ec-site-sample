import { useEffect, useState } from "react";
import Layout from "components/templates/layout";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { fetchOrders } from "services/api";
import Order from "components/organisms/order";

function Orders({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const init = async () => {
      const res = await fetchOrders();
      setOrders(res.data);
    };

    init();
  }, [user, navigate]);

  return (
    <Layout user={user}>
      <div className={styles.container}>
        <h2 className={styles.title}>注文履歴</h2>
        <div className={styles.body}>
          {orders.map((item) => (
            <Order key={item.id} order={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
