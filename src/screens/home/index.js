import Layout from "components/templates/layout";
import Products from "components/templates/products";
import Slide from "components/organisms/slide";
import icon from "assets/logo-light.png";
import { ReactComponent as Arrow } from "assets/arrow.svg";
import styles from "./index.module.css";

const Home = ({ user }) => {
  return (
    <div>
      <header className={styles.header}>
        <div>
          <img src={icon} alt="Button" />
        </div>
        <h1 className={styles.title}>Women</h1>
      </header>
      <div className={styles.mainArrow}>
        <Arrow width="100%" height="100%" preserveAspectRatio="none" />
      </div>
      <div className={styles.subArrow}>
        <Arrow width="100%" height="100%" preserveAspectRatio="none" />
      </div>
      <Slide />;
    </div>
  );
};

export default Home;
