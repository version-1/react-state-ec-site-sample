import { useEffect, useState } from "react";
import { TextField } from "components/atoms/textField";
import Button from "components/atoms/button";
import Layout from "components/templates/layout";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { createToken, setToken } from "services/api";

function Login({ user, onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "メールアドレスを入力してください";
    }

    if (!password) {
      newErrors.password = "パスワードを入力してください";
    }

    setErrors(newErrors);

    return !Object.keys(newErrors).length;
  };

  return (
    <Layout guest>
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
              if (!validate()) {
                return;
              }

              try {
                const res = await createToken({ email, password });
                if (res.data) {
                  const { token, user } = res.data
                  setToken(token);
                  onLogin(user);
                  navigate("/");
                }
              } catch (e) {
                if (e.status === 403) {
                  alert("メールアドレスかパスワードが正しくありません。");
                  return;
                }
              }
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Login;
