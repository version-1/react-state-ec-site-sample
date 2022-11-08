import { useContext } from 'react';
import Layout from "components/templates/layout";
import { TextField } from "components/atoms/textField";
import PaymentCard from "components/molecules/paymentCard";
import { AuthContext } from "contexts";
import styles from "./index.module.css";
import Button from "components/atoms/button";
import Tooltip from "components/atoms/tooltip";
import { BASE_URL } from "services/api";

function Accounts() {
  const {
    data: { user }
  } = useContext(AuthContext);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}> アカウント</h2>
          <div>
            <div className={styles.body}>
              <h3 className={styles.subtitle}>プロフィール</h3>
              <div className={`${styles.section} ${styles.flex}`}>
                <div className={styles.avatar}>
                  <img src={BASE_URL + user.iconURL} alt="プロフィール" />
                </div>
                <div className={styles.profile}>
                  <div>
                    <p>
                      <label>名前</label>
                    </p>
                    <div className={styles.twinForm}>
                      <TextField value={user.firstName} readOnly />
                      <TextField value={user.lastName} readOnly />
                    </div>
                  </div>
                  <div>
                    <p>
                      <label>よみがな</label>
                    </p>
                    <div className={styles.twinForm}>
                      <TextField value={user.firstNameKana} readOnly />
                      <TextField value={user.lastNameKana} readOnly />
                    </div>
                  </div>
                  <div>
                    <p>
                      <label>メールアドレス</label>
                    </p>
                    <TextField value={user.email} readOnly />
                  </div>
                  <div>
                    <p>
                      <label>生年月日</label>
                    </p>
                    <TextField value={user.birthday.split(" ")[0]} readOnly />
                  </div>
                </div>
              </div>
              <div className={styles.action}>
                <Tooltip message="未実装の機能です">
                  <Button label="編集" style={{ width: 200 }} disabled />
                </Tooltip>
              </div>
            </div>
            <h3 className={styles.subtitle}>お届け先</h3>
            <div className={styles.section}>
              <div className={styles.flex}>
                <div className={styles.left}></div>
                <div className={styles.right}>
                  <div>
                    <p>
                      <label>都道府県</label>
                    </p>
                    <TextField value={user.shipmentInfo?.prefecture} readOnly />
                  </div>
                  <div>
                    <p>
                      <label>市区町村</label>
                    </p>
                    <TextField value={user.shipmentInfo?.city} readOnly />
                  </div>
                  <div>
                    <p>
                      <label>住所 1</label>
                    </p>
                    <TextField value={user.shipmentInfo?.address1} readOnly />
                  </div>
                  <div>
                    <p>
                      <label>住所 2</label>
                    </p>
                    <TextField value={user.shipmentInfo?.address2} readOnly />
                  </div>
                </div>
              </div>
              <div className={styles.action}>
                <Tooltip message="未実装の機能です">
                  <Button label="編集" style={{ width: 200 }} disabled />
                </Tooltip>
              </div>
            </div>
            <h3 className={styles.subtitle}>支払い情報</h3>
            <div className={styles.section}>
              <div className={styles.flex}>
                <div className={styles.left}></div>
                <div className={styles.right}>
                  {user.paymentInfo ? (
                    <PaymentCard payment={user.paymentInfo} />
                  ) : (
                    <p className={styles.empty}>
                      支払い情報が登録されていません。
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.action}>
                <Tooltip message="未実装の機能です">
                  <Button label="編集" style={{ width: 200 }} disabled />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Accounts;
