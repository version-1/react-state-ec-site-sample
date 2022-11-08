import {
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import classNames from "classnames";
import kidsImage from "assets/kids/image.jpg";
import menImage from "assets/men/image.jpg";
import womenImage from "assets/women/image.jpg";
import style from "./index.module.css";

const Slide = ({ index, onNext = () => {}, onPrev = () => {} }) => {
  return (
    <div className={style.container}>
      <div className={style.overlay} />
      {true ? (
        <>
          <IoChevronBack
            className={style.back}
            onClick={onPrev}
            size={32}
            color="white"
          />
          <IoChevronForward
            className={style.forward}
            onClick={onNext}
            size={32}
            color="white"
          />
        </>
      ) : null}
      <ul className={style.content}>
        <li className={index === 0 ? style.active : ""}>
          {index === 0 ? (
            <div className={style.buttons}>
              <a
                className={style.button}
                href="/#/items?page=1&text=&categories%5B0%5D=women&categories%5B1%5D=t-shirts"
              >
                Shirts
              </a>
              <a
                className={classNames({
                  [style.button]: true,
                  [style.buttonLight]: true,
                })}
                href="/#/items?page=1&text=&categories%5B0%5D=women&categories%5B1%5D=coats"
              >
                Coats
              </a>
              <a
                className={style.button}
                href="/#/items?page=1&text=&categories%5B0%5D=women&categories%5B1%5D=coats"
              >
                Outers
              </a>
            </div>
          ) : null}
          <img src={womenImage} alt="Women" />
        </li>
        <li className={index === 1 ? style.active : ""}>
          {index === 1 ? (
            <div className={style.buttons}>
              <a
                className={style.button}
                href="/#/items?page=1&text=&categories%5B0%5D=men&categories%5B1%5D=t-shirts"
              >
                Shirts
              </a>
              <a
                className={classNames({
                  [style.button]: true,
                  [style.buttonLight]: true,
                })}
                href="/#/items?page=1&text=&categories%5B0%5D=men&categories%5B1%5D=coats"
              >
                Coats
              </a>
              <a
                className={style.button}
                href="/#/items?page=1&text=&categories%5B0%5D=men&categories%5B1%5D=coats"
              >
                Outers
              </a>
            </div>
          ) : null}
          <img src={menImage} alt="Men" />
        </li>
        <li className={index === 2 ? style.active : ""}>
          <div
            className={classNames({
              [style.buttons]: true,
              [style.buttonsForKids]: true,
            })}
          >
            <a
              className={classNames({
                [style.button]: true,
              })}
              href="/#/items?page=1&text=&categories%5B0%5D=kids"
            >
              <p className={style.kidsButtonText}>
                <span>Kids</span>
              </p>
            </a>
          </div>
          <img src={kidsImage} alt="Kids" />
        </li>
      </ul>
    </div>
  );
};

export default Slide;
