import { IoStarHalfOutline, IoStarOutline, IoStarSharp } from "react-icons/io5";
import style from "./index.module.css";

const color = '#e5cc20'

const Ratings = ({ rate }) => {
  const ratings = [];
  for (let i = 0; i < 50; i = i + 10) {
    const v = rate * 10;
    const key = `ratings-${i}`;
    if (v - i < 10 && v - i > 0) {
      ratings.push(
        <li key={key}>
          <IoStarHalfOutline color={color} />
        </li>
      );
    } else if (v - i <= 0) {
      ratings.push(
        <li key={key}>
          <IoStarOutline color={color} />
        </li>
      );
    } else {
      ratings.push(
        <li key={key}>
          <IoStarSharp color={color} />
        </li>
      );
    }
  }
  return (
    <ul className={style.container}>
      {ratings.map((item) => {
        return item;
      })}
    </ul>
  );
};

export default Ratings;
