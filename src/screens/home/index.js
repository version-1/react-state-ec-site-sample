import { useCallback, useEffect, useState } from "react";
import Slide from "components/organisms/slide";
import icon from "assets/logo-light.png";
import { ReactComponent as Arrow } from "assets/arrow.svg";
import styles from "./index.module.css";

const title = [
  { label: "Women", path: "/#/women" },
  { label: "Men", path: "/#/men" },
  { label: "Kids", path: "/#/kids" },
];

const Home = () => {
  const [index, setIndex] = useState(0);

  const transit = useCallback(
    (delta) => () => setIndex(Math.abs((index + delta) % 3)),
    [index, setIndex]
  );

  useEffect(() => {
    setTimeout(() => {
      transit(1)();
    }, 5000);
  }, [transit]);

  const { label: titleText, path } = title[index];

  return (
    <div>
      <header className={styles.header}>
        <div>
          <a href={path}>
            <img src={icon} alt="Button" />
          </a>
        </div>
        <h1 className={styles.title}>
          <a className={styles.titleText} href={path}>
            {titleText}
          </a>
        </h1>
      </header>
      <div className={styles.mainArrow}>
        <Arrow width="100%" height="100%" preserveAspectRatio="none" />
      </div>
      <div className={styles.subArrow}>
        <Arrow width="100%" height="100%" preserveAspectRatio="none" />
      </div>
      <Slide index={index} onNext={transit(1)} onPrev={transit(-1)} />;
    </div>
  );
};

export default Home;
