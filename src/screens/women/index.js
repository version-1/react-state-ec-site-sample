import Layout from "components/templates/layout";
import Products from "components/templates/products";
import Slide from "components/organisms/slide";
import { categoryList } from "models/filter";

const Women = ({ user }) => {
  return (
    <Layout user={user}>
      <section>
        <Slide defaultIndex={0} slide={false} />
      </section>
      <Products defaultFilters={[categoryList[1]]} />
    </Layout>
  );
};

export default Women;
