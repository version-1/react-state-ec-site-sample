import { useEffect, useCallback, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames";
import Layout from "components/templates/layout";
import Dropdown from "components/atoms/select";
import Button from "components/atoms/button";
import { useCart } from "hooks/useCart";
import { fetchProduct } from "services/api";
import { assetURL } from "constants/index";
import { sizeList, colorList } from "models/filter";
import styles from "./index.module.css";

function Item({ user }) {
  const { code } = useParams();
  const [item, setItem] = useState();
  const [form, setForm] = useState({
    color: undefined,
    size: undefined,
    amount: undefined,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { add, has } = useCart();

  useEffect(() => {
    if (!code) {
      return;
    }

    const init = async () => {
      const res = await fetchProduct({ code });
      if (res.data) {
        setItem(res.data);
      }
    };

    init();
  }, [code]);

  const sizes = useMemo(() => {
    if (!form.color) {
      return undefined;
    }

    return item.stocks[form.color];
  }, [item, form]);

  const amounts = useMemo(() => {
    if (!form.color || !form.size) {
      return [];
    }

    return new Array(sizes[form.size] || 0)
      .fill("")
      .map((_, index) => ({ label: index + 1, value: index + 1 }));
  }, [sizes, form]);

  const onChange = useCallback(
    (form) => {
      setForm(form);
      setErrors({});
    },
    [setForm, setErrors]
  );

  if (!item) {
    return null;
  }

  return (
    <Layout user={user}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            className={styles.featuredImage}
            src={assetURL + item.imageURL}
            alt={item.title}
          />
          <div className={styles.imageList}>
            <h3 className={styles.label}>商品イメージ</h3>
            <ul className={styles.images}>
              <li>
                <div className={styles.image}></div>
              </li>
              <li>
                <div className={styles.image}></div>
              </li>
              <li>
                <div className={styles.image}></div>
              </li>
              <li>
                <div className={styles.image}></div>
              </li>
            </ul>
          </div>
          <div className={styles.description}>
            <h3 className={styles.descriptionHeading}>この商品について</h3>
            <div className={styles.descriptionSection}>
              <h4 className={styles.descriptionTitle}>概要</h4>
              <div className={styles.descriptionBody}>
                この商品に関する概要はありません
              </div>
            </div>
            <div className={styles.descriptionSection}>
              <h4 className={styles.descriptionTitle}>商品詳細</h4>
              <div className={styles.descriptionBody}>
                この商品に関する詳細はありません
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.form}>
            <div className={styles.row}>
              <h3 className={styles.label}>カラー</h3>
              <div>
                <ul className={styles.colors}>
                  {colorList.map((c) => {
                    const hasStock = Object.values(
                      item.stocks[c.value] || {}
                    ).some((it) => it > 0);

                    return (
                      <div
                        className={styles.colorContainer}
                        onClick={() => {
                          if (!hasStock) {
                            return;
                          }

                          onChange({
                            ...form,
                            color: c.value,
                          });
                        }}
                      >
                        <div
                          className={classNames(styles.colorOverlay, {
                            [styles.colorDisabled]: !hasStock,
                            [styles.colorSelected]: form.color === c.value,
                          })}
                        ></div>
                        <div
                          className={styles.color}
                          style={{ background: c.value }}
                        ></div>
                      </div>
                    );
                  })}
                </ul>
                <p className={styles.errorMessage}>{errors.color}</p>
              </div>
              <div className={styles.row}>
                <h3 className={styles.label}>サイズ</h3>
                <div>
                  <ul className={styles.sizes}>
                    {sizeList.map((size) => {
                      const hasStock = sizes
                        ? (sizes[size.value] || 0) > 0
                        : true;

                      return (
                        <div
                          className={styles.sizeContainer}
                          onClick={() => {
                            if (!hasStock) {
                              return;
                            }

                            onChange({
                              ...form,
                              size: size.value,
                            });
                          }}
                        >
                          <div
                            className={classNames(styles.sizeOverlay, {
                              [styles.sizeDisabled]: !hasStock,
                              [styles.sizeSelected]: form.size === size.value,
                            })}
                          ></div>
                          <div className={styles.size}>{size.label}</div>
                        </div>
                      );
                    })}
                  </ul>
                  <p className={styles.errorMessage}>{errors.size}</p>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <p className={styles.price}>¥ {item.price.toLocaleString()}</p>
            </div>
            <div className={styles.row}>
              <h3 className={styles.label}>数量</h3>
              <div className={styles.dropdown}>
                <Dropdown
                  data={amounts}
                  onSelect={(item) => {
                    onChange({
                      ...form,
                      amount: item.value,
                    });
                  }}
                />
                <p className={styles.errorMessage}>{errors.amount}</p>
              </div>
            </div>
            <div>
              <Button
                label="カートに入れる"
                disabled={has(item) || Object.values(errors).length > 0}
                onClick={() => {
                  const validationErrors = {};
                  if (!form.color) {
                    validationErrors.color = "カラーを選択してください";
                  }

                  if (!form.size) {
                    validationErrors.size = "サイズを選択してください";
                  }

                  if (!form.amount) {
                    validationErrors.amount = "数量を選択してください";
                  }

                  setErrors(validationErrors);
                  if (Object.keys(validationErrors).length > 0) {
                    return;
                  }

                  add({
                    code: item.code,
                    product: item,
                    form,
                  });
                  navigate("/cart");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Item;
