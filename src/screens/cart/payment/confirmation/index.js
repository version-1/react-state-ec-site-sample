import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "components/templates/layout";
import PaymentTemplate from "components/templates/payment";
import Loader from "components/atoms/loader";
import { checkout } from "services/api";
import { useCart } from "hooks/useCart";
import {queryClient} from "services/tanstack";

function PaymentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, clear, totalAmount } = useCart();
  const { payment: defaultValue } = location?.state || {};
  const mutation = useMutation({
    mutationFn: ({ totalAmount, products, shipmentInfo }) => {
      return checkout({
        totalAmount,
        products,
        shipmentInfo,
      });
    },
    onSuccess: (res) => {
      if (res.error) {
        console.error(res.error);
        return
      }

      clear();
      queryClient.invalidateQueries({ queryKey: ['', 'orders']})
      navigate("/cart/payment/complete");
    },
  });

  useEffect(() => {
    if (!defaultValue) {
      navigate("/cart");
    }
  }, [defaultValue, navigate]);

  if (!defaultValue) {
    return null;
  }

  if (mutation.isLoading) {
    return (
      <Layout publicPage>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <PaymentTemplate
        readOnly
        submitLabel="支払いを完了させる"
        defaultValue={defaultValue}
        onSubmit={async () => {
          mutation.mutate({
            totalAmount,
            products,
            shipmentInfo: defaultValue.userInfo.shipmentInfo,
          });
        }}
      />
    </Layout>
  );
}

export default PaymentConfirmation;
