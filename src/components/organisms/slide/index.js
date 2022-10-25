import { useCallback, useEffect, useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import kidsImage from "assets/kids/image.jpg";
import menImage from "assets/men/image.jpg";
import womenImage from "assets/women/image.jpg";
import style from "./index.module.css";

const Slide = (
  { defaultIndex = 0, slide = true } = { slide: true, defaultIndex: 0 }
) => {
  const [index, setIndex] = useState(defaultIndex);

  const next = useCallback(() => setIndex((index + 1) % 3), [index]);

  useEffect(() => {
    if (slide) {
      setTimeout(() => {
        next();
      }, 5000);
    }
  }, [next, slide]);

  return (
    <div className={style.container}>
      <div className={style.overlay} />
      {slide ? (
        <>
          <IoChevronBack
            className={style.back}
            onClick={next}
            size={32}
            color="white"
          />
          <IoChevronForward
            className={style.forward}
            onClick={next}
            size={32}
            color="white"
          />
        </>
      ) : null}
      <ul className={style.content}>
        <li className={index === 0 ? style.active : ""}>
          <img src={womenImage} alt="" />
        </li>
        <li className={index === 1 ? style.active : ""}>
          <img src={menImage} alt="" />
        </li>
        <li className={index === 2 ? style.active : ""}>
          <img src={kidsImage} alt="" />
        </li>
      </ul>
    </div>
  );
};

export default Slide;
