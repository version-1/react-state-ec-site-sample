import Layout from "components/templates/layout";
import styles from "./index.module.css";
import { fetchOrders } from "services/api";
import { useQuery } from "@tanstack/react-query";
import Order from "components/organisms/order";

function Orders() {
  const query = useQuery({ queryKey: ["orders"], queryFn: async () => {
    const res = await fetchOrders()
    return res.data
  }});

  if (query.isLoading) {
    return null;
  }

  const { data: orders } = query;

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
