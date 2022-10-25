import Layout from "components/templates/layout";
import Products from "components/templates/products";
import { categoryList } from "models/filter";
import style from "./index.module.css";

const Kids = ({ user }) => {
  return (
    <Layout user={user}>
      <Products defaultFilters={[categoryList[2]]} />
    </Layout>
  );
};

export default Kids;
