import { useEffect, useState } from "react";
import Layout from "components/templates/layout";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { fetchOrders } from "services/api";

function Orders({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState();

  useEffect(() => {
    const init = async () => {
      const res = fetchOrders();
      setOrders(res.data);
    };

    init();
  }, [user, navigate]);

  return (
    <Layout user={user}>
      <div className={styles.container}></div>
    </Layout>
  );
}

export default Orders;
