import style from "./index.module.css";
import Ratings from "components/molecules/ratings";
import { Link } from "react-router-dom";
import { assetURL } from "constants/index";

const sizeList = ["xs", "s", "m", "l", "xl"];

const SizeLabel = ({ item }) => {
  const label = sizeList.reduce(
    (acc, key, index) => {
      if (item.size[key]) {
        return { max: Math.max(index, acc.max), min: Math.min(index, acc.min) };
      }

      return acc;
    },
    { max: -Infinity, min: Infinity }
  );

  return (
    <span>
      {sizeList[label.min]?.toUpperCase()} ~{" "}
      {sizeList[label.max]?.toUpperCase()}
    </span>
  );
};

const Product = ({ item }) => {
  return (
    <Link to={`/items/${item.code}`}>
      <div className={style.container} key={item.id}>
        <div className={style.image}>
          <img
            className={style.img}
            src={assetURL + item.imageURL}
            alt={item.title}
          />
        </div>
        <div className={style.content}>
          <ul className={style.colors}>
            {Object.keys(item.colors).map((color) => {
              return (
                <li key={color}>
                  <div
                    style={{
                      border: "1px solid #bbb",
                      background: color,
                      marginRight: 4,
                      height: 16,
                      width: 16,
                    }}
                  ></div>
                </li>
              );
            })}
          </ul>
          <div className={style.info}>
            <ul className={style.categories}>
              {item.categories.map((category) => {
                return (
                  <li key={category.label}>
                    <div>{category.label}</div>
                  </li>
                );
              })}
            </ul>
            <div className={style.size}>
              <SizeLabel item={item} />
            </div>
          </div>
          <div className={style.headlines}>
            <h3 className={style.title}>{item.title}</h3>
            <p className={style.price}>¥{item.price.toLocaleString()}</p>
            <Ratings rate={item.rating?.rate} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
