import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "components/templates/layout";
import PaymentTemplate from "components/templates/payment";

function Payment() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <PaymentTemplate
        defaultValue={{
          userInfo: user,
        }}
        submitLabel="支払い確認画面に進む"
        onSubmit={(payment) => {
          navigate("/cart/payment/confirmation", {
            state: { payment },
          });
        }}
      />
    </Layout>
  );
}

export default Payment;
