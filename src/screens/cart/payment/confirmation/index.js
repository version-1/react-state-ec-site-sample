import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "components/templates/layout";
import PaymentTemplate from "components/templates/payment";
import { checkout } from "services/api";
import { useCart } from "hooks/useCart";

function PaymentConfirmation({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clear, totalAmount } = useCart();
  const { payment: defaultValue } = location?.state || {};

  useEffect(() => {
    if (!defaultValue) {
      navigate("/cart");
    }
  }, [defaultValue]);

  if (!defaultValue) {
    return null;
  }

  return (
    <Layout user={user}>
      <PaymentTemplate
        readOnly
        submitLabel="支払いを完了させる"
        defaultValue={defaultValue}
        onSubmit={async () => {
          try {
            await checkout({
              userId: user.id,
              totalAmount,
              products: defaultValue.codes.map((code) => {
                return cart[code];
              }),
              shipmentInfo: defaultValue.userInfo.shipmentInfo,
            });
            clear()
          } catch (e) {
            console.error(e);
            return
          }

          navigate("/cart/payment/complete");
        }}
      />
    </Layout>
  );
}

export default PaymentConfirmation;
