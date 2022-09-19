import Layout from "components/templates/layout";
import Products from "components/templates/products";
import Slide from "components/organisms/slide";
import { categoryList } from "models/filter";
import style from "./index.module.css";

const Kids = ({ user }) => {
  return (
    <Layout user={user}>
      <section>
        <Slide defaultIndex={2} slide={false} />
      </section>
      <Products defaultFilters={[categoryList[2]]} />
    </Layout>
  );
};

export default Kids;
