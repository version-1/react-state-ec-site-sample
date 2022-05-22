import "./index.css";
import Ratings from "components/molecules/ratings";

const Product = ({ item }) => {
  return (
    <div className="product" key={item.id}>
      <div className="product-image">
        <img src={item.imageUrl} alt={item.title} />
      </div>
      <div className="product-content">
        <ul className="product-colors">
          {item.colors.map((color) => {
            return (
              <li key={color.hex}>
                <div
                  style={{
                    background: color.hex,
                    marginRight: 4,
                    height: 16,
                    width: 16,
                  }}
                ></div>
              </li>
            );
          })}
        </ul>
        <div className="product-info">
          <ul className="product-categories">
            {item.categories.map((category) => {
              return (
                <li>
                  <div>{category.label}</div>
                </li>
              );
            })}
          </ul>
          <div className="product-size">
            {item.size.min} ~ {item.size.max}
          </div>
        </div>
        <div className="product-headlines">
          <h3 className="product-title">{item.title}</h3>
          <p className="product-price">¥{item.price.toLocaleString()}</p>
          <Ratings rate={item.rating?.rate} />
        </div>
      </div>
    </div>
  );
};

export default Product;
