import Layout from "components/templates/layout";
import Products from "components/templates/products";
import { categoryList } from "models/filter";
import style from "./index.module.css";

const Men = ({ user }) => {
  return (
    <Layout user={user}>
      <Products defaultFilters={[categoryList[0]]} />
    </Layout>
  );
};

export default Men;
