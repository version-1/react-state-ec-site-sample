import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "components/templates/layout";
import PaymentTemplate from "components/templates/payment";
import { checkout } from "services/api";
import { useCart } from "hooks/useCart";

function PaymentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clear, totalAmount } = useCart();
  const { payment: defaultValue } = location?.state || {};

  useEffect(() => {
    if (!defaultValue) {
      navigate("/cart");
    }
  }, [defaultValue, navigate]);

  if (!defaultValue) {
    return null;
  }

  return (
    <Layout>
      <PaymentTemplate
        readOnly
        submitLabel="支払いを完了させる"
        defaultValue={defaultValue}
        onSubmit={async () => {
          const res = await checkout({
            totalAmount,
            products: defaultValue.codes.map((code) => {
              return cart[code];
            }),
            shipmentInfo: defaultValue.userInfo.shipmentInfo,
          });
          if (res.data) {
            clear();
            navigate("/cart/payment/complete");
          }

          if (res.error) {
            console.error(res.error)
          }
        }}
      />
    </Layout>
  );
}

export default PaymentConfirmation;
