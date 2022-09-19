import Layout from "components/templates/layout";
import Products from "components/templates/products";
import Slide from "components/organisms/slide";
import { categoryList } from "models/filter";
import style from "./index.module.css";

const Men = ({ user }) => {
  return (
    <Layout user={user}>
      <section>
        <Slide defaultIndex={1} slide={false} />
      </section>
      <Products defaultFilters={[categoryList[0]]} />
    </Layout>
  );
};

export default Men;
