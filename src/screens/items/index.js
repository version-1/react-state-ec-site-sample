import Layout from "components/templates/layout";
import Products from "components/templates/products";

function Items({ user }) {
  return (
    <Layout user={user} publicPage>
      <Products />
    </Layout>
  );
}

export default Items;
