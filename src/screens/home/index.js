import Layout from "components/templates/layout";
import Products from "components/templates/products";
import Slide from "components/organisms/slide";

const Home = () => {
  return (
    <Layout>
      <section>
        <Slide />
      </section>
      <Products />
    </Layout>
  );
};

export default Home;
