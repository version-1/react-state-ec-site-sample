import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useCart } from "hooks/useCart";
import Subtotal from "components/organisms/subtotal";
import Button from "components/atoms/button";
import { assetURL } from "constants/index";
import { TextField } from "components/atoms/textField";
import PaymentCard from "components/molecules/paymentCard";

const fieldMap = {
  lastName: "姓",
  firstName: "名",
  lastNameKana: "セイ",
  firstNameKana: "メイ",
  zipCode: "郵便番号",
  prefecture: "都道府県",
  city: "市区町村",
  address1: "番地",
};

const validate = ({ userInfo }) => {
  const errors = Object.keys(fieldMap).reduce((acc, key) => {
    const value = userInfo[key] || userInfo.shipmentInfo?.[key];
    if (!value) {
      return {
        ...acc,
        [key]: `${fieldMap[key]} を入力してください。`,
      };
    }

    return acc;
  }, {});

  const { paymentInfo } = userInfo;
  if (!paymentInfo) {
    errors.paymentInfo = `支払い情報を入力してください。`;
  }
  return errors;
};

const defaultUserInfo = {
  firstName: undefined,
  lastName: undefined,
  firstNameKana: undefined,
  lastNameKana: undefined,
  shipmentInfo: {
    zipCode: undefined,
    prefecture: undefined,
    city: undefined,
    address1: undefined,
    address2: undefined,
  },
  paymentInfo: undefined,
};

function Payment({ readOnly, defaultValue, submitLabel, onSubmit }) {
  const [errors, setErrors] = useState({});
  const { products, summary, cart, codes } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(() => ({
    userInfo: defaultUserInfo,
    codes,
    summary,
    ...(defaultValue || {}),
  }));

  const { userInfo } = payment;

  const handleOnChange = (name) => (e) => {
    const { value } = e.target;
    const { userInfo, ...rest } = payment;
    if (Object.keys(defaultUserInfo.shipmentInfo).includes(name)) {
      setPayment({
        ...rest,
        userInfo: {
          ...userInfo,
          shipmentInfo: {
            ...(userInfo.shipmentInfo || defaultUserInfo.shipmentInfo),
            [name]: value,
          },
        },
      });
      return;
    }

    setPayment({
      ...rest,
      userInfo: {
        ...userInfo,
        [name]: value,
      },
    });
  };

  const handleSubmit = useCallback(() => {
    setErrors({});
    const errors = validate(payment);
    setErrors(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    onSubmit(payment);
  }, [payment, onSubmit]);

  const { shipmentInfo = {}, paymentInfo } = userInfo;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.section}>
            <h2>1. お届け情報の入力</h2>
            <div>
              <h3 className={styles.fieldTitle}>氏名</h3>
              <div className={styles.twinForm}>
                <TextField
                  label="姓"
                  onChange={handleOnChange("lastName")}
                  value={userInfo.lastName}
                  readOnly={readOnly}
                  errorMessage={errors.lastName}
                />
                <TextField
                  label="名"
                  onChange={handleOnChange("firstName")}
                  value={userInfo.firstName}
                  readOnly={readOnly}
                  errorMessage={errors.firstName}
                />
              </div>
            </div>
            <div>
              <div className={styles.twinForm}>
                <TextField
                  label="セイ"
                  onChange={handleOnChange("lastNameKana")}
                  value={userInfo.lastNameKana}
                  readOnly={readOnly}
                  errorMessage={errors.lastNameKana}
                />
                <TextField
                  label="メイ"
                  onChange={handleOnChange("firstNameKana")}
                  value={userInfo.firstNameKana}
                  readOnly={readOnly}
                  errorMessage={errors.firstNameKana}
                />
              </div>
            </div>
            <div>
              <h3 className={styles.fieldTitle}>郵便番号</h3>
              <TextField
                onChange={handleOnChange("zipCode")}
                value={shipmentInfo.zipCode}
                readOnly={readOnly}
                errorMessage={errors.zipCode}
              />
            </div>
            <div>
              <h3 className={styles.fieldTitle}>都道府県</h3>
              <TextField
                onChange={handleOnChange("prefecture")}
                value={shipmentInfo.prefecture}
                readOnly={readOnly}
                errorMessage={errors.prefecture}
              />
            </div>
            <div>
              <h3 className={styles.fieldTitle}>市区町村</h3>
              <TextField
                onChange={handleOnChange("city")}
                value={shipmentInfo.city}
                readOnly={readOnly}
                errorMessage={errors.city}
              />
            </div>
            <div>
              <h3 className={styles.fieldTitle}>番地</h3>
              <TextField
                onChange={handleOnChange("address1")}
                value={shipmentInfo.address1}
                readOnly={readOnly}
                errorMessage={errors.address1}
              />
            </div>
            <div>
              <h3 className={styles.fieldTitle}>
                アパート・マンション・部屋番号
              </h3>
              <TextField
                onChange={handleOnChange("address2")}
                value={shipmentInfo.address2}
                readOnly={readOnly}
                errorMessage={errors.address2}
              />
            </div>
          </div>
          <div className={styles.section}>
            <h2>2. 支払い方法</h2>
            <div>
              <h2>クレジットカード</h2>
              {errors.paymentInfo && (
                <p className={styles.errorMessages}>{errors.paymentInfo}</p>
              )}
              <PaymentCard payment={paymentInfo} />
              {readOnly ? null : (
                <div className={styles.newCard}>
                  <a>+ 新しいカードを登録する</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightSection}>
            <h3 className={styles.rightSectionTitle}>注文商品</h3>
            {products.map((item) => {
              const cur = cart[item.code];
              const { form, product } = cur;

              return (
                <div className={styles.product}>
                  <div className={styles.productLeft}>
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.image}
                        src={assetURL + product.imageURL}
                        alt={product.title}
                      />
                    </div>
                  </div>
                  <div className={styles.productRight}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p>カラー: {form.color} </p>
                    <p>サイズ: {form.size}</p>
                    <p>数量: {form.amount}</p>
                    <p className={styles.productPrice}>
                      ¥ {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.rightSection}>
            <h3 className={styles.rightSectionTitle}>小計</h3>
            <div className={styles.summary}>
              <Subtotal summary={summary} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <Button
          label="カートに戻る"
          variant="outline"
          style={{ marginRight: "8px" }}
          onClick={() => navigate("/cart")}
        />
        <Button label={submitLabel} onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Payment;
