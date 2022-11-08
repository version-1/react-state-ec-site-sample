import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "hooks/useUser";
import { TextField } from "components/atoms/textField";
import Button from "components/atoms/button";
import Layout from "components/templates/layout";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { createToken } from "services/api";
import { setToken } from "services/api";
import Loader from "components/atoms/loader";
import { queryClient } from "services/tanstack";

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
  const { data: user } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: ({ email, password }) => {
      return createToken({ email, password });
    },
    onSuccess: (res) => {
      if (res.error) {
        if (res.error.status === 403) {
          alert("メールアドレスかパスワードが正しくありません。");
          return;
        }
        console.error(res.error);
        return
      }

      const { token } = res.data;
      setToken(token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/items");
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/items");
    }
  }, [user, navigate]);

  if (mutation.isLoading) {
    return (
      <Layout publicPage>
        <Loader />
      </Layout>
    );
  }

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

              mutation.mutate({ email, password });
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Login;
