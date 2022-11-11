import { useContext, useEffect, useState } from "react";
import { TextField } from "components/atoms/textField";
import Button from "components/atoms/button";
import Layout from "components/templates/layout";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { createToken } from "services/api";
import { AuthContext } from "contexts";

const validate = ({ email, password }) => {
  const newErrors = {};
  if (!email) {
    newErrors.email = "メールアドレスを入力してください";
  }

  if (!password) {
    newErrors.password = "パスワードを入力してください";
  }

  return newErrors;
};

function Login() {
  const {
    data: { isLogin },
    login
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isLogin) {
      navigate("/items");
    }
  }, [isLogin, navigate]);

  return (
    <Layout menu={false} publicPage>
      <div className={styles.container}>
        <div className={styles.form}>
          <h2 className={styles.title}>メールアドレスでログイン</h2>
          <TextField
            label="メールアドレス"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="メールアドレス"
            errorMessage={errors.email}
          />
          <TextField
            label="パスワード"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            value={password}
            errorMessage={errors.password}
          />
          <Button
            label="ログイン"
            onClick={async () => {
              setErrors({});
              const errors = validate({ email, password });
              setErrors(errors);
              if (Object.keys(errors).length !== 0) {
                return;
              }

              try {
                const res = await createToken({ email, password });
                if (res.data) {
                  const { token, user } = res.data;
                  login(user, token);
                  navigate("/items");
                }
              } catch (e) {
                if (e.status === 403) {
                  alert("メールアドレスかパスワードが正しくありません。");
                  return;
                }
                console.error(e)
              }
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Login;