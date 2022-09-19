import { useNavigate } from "react-router-dom";
import Layout from "components/templates/layout";
import PaymentTemplate from "components/templates/payment";

function Payment({ user }) {
  const navigate = useNavigate();

  const { shipmentInfo } = user || {};

  return (
    <Layout user={user}>
      <PaymentTemplate
        defaultValue={{
          userInfo: {
            ...user,
            ...shipmentInfo,
          },
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
