import Layout from "components/templates/layout";
import Products from "components/templates/products";
import { categoryList } from "models/filter";

const Women = ({ user }) => {
  return (
    <Layout user={user}>
      <Products defaultFilters={[categoryList[1]]} />
    </Layout>
  );
};

export default Women;
