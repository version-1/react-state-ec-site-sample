
import { useEffect, useState } from "react";
import "./Home.css";
import fiberImage from "assets/hero_fiber.jpg";
import menImage from "assets/hero_men.jpg";
import womenImage from "assets/hero_women.jpg";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIndex((index + 1) % 3)
    }, 5000)
  }, [index])

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="home-hero-overlay" />
        <IoChevronBack className="home-hero-back" size={32} color="white" />
        <IoChevronForward className="home-hero-forward" size={32} color="white" />
        <ul className="home-slide">
          <li className={ index === 0 ? "active" : "" }>
            <img src={womenImage} alt="" />
          </li>
          <li className={ index === 1 ? "active" : "" }>
            <img src={menImage} alt="" />
          </li>
          <li className={ index === 2 ? "active" : "" }>
            <img src={fiberImage} alt="" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
