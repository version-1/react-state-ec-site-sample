import Layout from "components/templates/layout";
import Products from "components/templates/products";
import Slide from "components/organisms/slide";

const Home = ({ user }) => {
  return (
    <Layout user={user}>
      <section>
        <Slide />
      </section>
      <Products />
    </Layout>
  );
};

export default Home;
