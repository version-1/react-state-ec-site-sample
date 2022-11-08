import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "components/templates/layout";
import PaymentTemplate from "components/templates/payment";
import { checkout } from "services/api";
import { useCart } from "hooks/useCart";

function PaymentConfirmation({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, clear, totalAmount } = useCart();
  const { payment: defaultValue } = location?.state || {};

  useEffect(() => {
    if (!defaultValue) {
      navigate("/cart");
    }
  }, [defaultValue, navigate]);

  return (
    <Layout user={user}>
      <PaymentTemplate
        readOnly
        submitLabel="支払いを完了させる"
        defaultValue={defaultValue}
        onSubmit={async () => {
          const res = await checkout({
            totalAmount,
            products,
            shipmentInfo: defaultValue.userInfo.shipmentInfo,
          });
          if (res.data) {
            clear();
            navigate("/cart/payment/complete");
          }

          if (res.error) {
            console.error(res.error);
          }
        }}
      />
    </Layout>
  );
}

export default PaymentConfirmation;
