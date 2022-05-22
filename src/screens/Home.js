import { useEffect, useState } from "react";
import Slide from "components/organisms/slide";
import { IoSearchOutline } from "react-icons/io5";
import Product from "components/organisms/product";
import { fetchProducts } from "services/api";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchProducts();

      const list = res.map((item) => {
        return {
          raw: item,
          id: item.id,
          title: item.title,
          imageUrl: item.image,
          price: Math.floor(item.price * 127),
          rating: item.rating,
          categories: [{ label: "MEN" }],
          colors: [
            {
              hex: "red",
            },
            {
              hex: "blue",
            },
            {
              hex: "lightgray",
            },
            {
              hex: "black",
            },
          ],
          size: { min: "M", max: "L" },
        };
      });
      setProducts(list);
    };

    fetch();
  }, []);
  return (
    <div className="home-container">
      <section className="home-hero">
        <Slide />
      </section>
      <section className="product-list">
        <h2 className="product-list-title">商品検索</h2>
        <div className="search-form">
          <input
            className="search-form-input"
            type="text"
            placeholder="キーワードで探す"
          />
          <a className="search-form-button">
            <IoSearchOutline size="32" color="white" />
          </a>
        </div>
        <div className="main">
          <div className="sidebar">
            <div className="sidebar-section">
              <h3>並び替え</h3>
              <select>
                <option value="latest">新着順</option>
                <option value="higher-price">価格の高い順</option>
                <option value="lower-price">価格の安い順</option>
              </select>
            </div>
            <div className="sidebar-section">
              <h3>フィルタ</h3>
              <select>
                <option value="latest">新着順</option>
                <option value="higher-price">価格の高い順</option>
                <option value="lower-price">価格の安い順</option>
              </select>
            </div>
            <div className="sidebar-section">
              <h3>カテゴリ</h3>
              <ul>
                <li>
                  <label>
                    <input type="checkbox" />
                    Men's
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    Women's
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    アウター
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    ジーンズ
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    アクセサリ
                  </label>
                </li>
              </ul>
            </div>
            <div className="sidebar-section">
              <h3>価格</h3>
              <ul>
                {[
                  [0, 5000],
                  [5000, 10000],
                  [10000, 20000],
                  [20000, 30000],
                  [30000, 40000],
                  [40000, 50000],
                  [50000, undefined],
                ].map(([min, max]) => {
                  return (
                    <li key={min}>
                      <label>
                        <input type="radio" />¥{min?.toLocaleString()} ~ ¥
                        {max?.toLocaleString()}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="products">
            {products.map((_item, index) => {
              if (index % 3 !== 0) {
                return null;
              }

              const [first, second, third] = products.slice(index, index + 3);
              console.log(first, second, third)
              return (
                <div className="product-list-row">
                  {first && <Product item={first} />}
                  {second && <Product item={second} />}
                  {third && <Product item={third} />}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
