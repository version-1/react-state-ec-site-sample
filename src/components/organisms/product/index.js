import style from "./index.module.css";
import Ratings from "components/molecules/ratings";

const assetURL = "http://localhost:8080/assets";

const Product = ({ item }) => {
  return (
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
              <li key={color.hex}>
                <div
                  style={{
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
                <li>
                  <div>{category.label}</div>
                </li>
              );
            })}
          </ul>
          <div className={style.size}>
            {item.size.min} ~ {item.size.max}
          </div>
        </div>
        <div className={style.headlines}>
          <h3 className={style.title}>{item.title}</h3>
          <p className={style.price}>¥{item.price.toLocaleString()}</p>
          <Ratings rate={item.rating?.rate} />
        </div>
      </div>
    </div>
  );
};

export default Product;
