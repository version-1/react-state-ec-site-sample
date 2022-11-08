import icon from "assets/home-logo.png";
import { Link } from "react-router-dom";
import { ReactComponent as Grid } from "assets/grid.svg";
import { pageLinks } from "constants/index";
import styles from "./index.module.css";

const title = [
  { label: "Women", path: pageLinks.women },
  { label: "Men", path: pageLinks.men },
  { label: "Kids", path: pageLinks.kids },
];

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.linksContainer}>
        <Link className={styles.logo} to="/items">
          <img className={styles.logoImage} src={icon} alt="Button" />
        </Link>
        <ul className={styles.links}>
          {title.map((it) => {
            return (
              <li key={it.path} className={styles.linkItem}>
                <Link className={styles.link} to={it.path}>
                  <span className={styles.linkText}>{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.cover}>
        <div className={styles.row}>
          <Grid />
          <Grid />
        </div>
        <div className={styles.row}>
          <Grid />
          <Grid />
        </div>
      </div>
    </div>
  );
};

export default Home;
