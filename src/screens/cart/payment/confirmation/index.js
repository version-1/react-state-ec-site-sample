import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "components/templates/layout";
import PaymentTemplate from "components/templates/payment";

function PaymentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
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
    <Layout>
      <PaymentTemplate
        readOnly
        submitLabel="支払いを完了させる"
        defaultValue={defaultValue}
        onSubmit={() => {
          navigate("/cart/payment/complete");
        }}
      />
    </Layout>
  );
}

export default PaymentConfirmation;
