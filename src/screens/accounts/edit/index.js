import Layout from "components/templates/layout";
import styles from "./index.module.css";

function AccountsEdit({ user }) {
  return (
    <Layout user={user}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2> アカウント編集</h2>
        </div>
      </div>
    </Layout>
  );
}

export default AccountsEdit;
