import { useEffect, useState } from "react";
import "./index.css";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import fiberImage from "assets/hero_fiber.jpg";
import menImage from "assets/hero_men.jpg";
import womenImage from "assets/hero_women.jpg";

const Slide = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIndex((index + 1) % 3);
    }, 5000);
  }, [index]);

  return (
    <div className="container">
      <div className="overlay" />
      <IoChevronBack className="back" size={32} color="white" />
      <IoChevronForward className="forward" size={32} color="white" />
      <ul className="content">
        <li className={index === 0 ? "active" : ""}>
          <img src={womenImage} alt="" />
        </li>
        <li className={index === 1 ? "active" : ""}>
          <img src={menImage} alt="" />
        </li>
        <li className={index === 2 ? "active" : ""}>
          <img src={fiberImage} alt="" />
        </li>
      </ul>
    </div>
  );
};

export default Slide;
