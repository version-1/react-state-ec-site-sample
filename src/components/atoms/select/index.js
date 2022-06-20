import { useEffect, useState } from "react";
import style from "./index.module.css";
import classNames from "classnames";

const Select = ({ data }) => {
  const [selected, setSelected] = useState(data[0]);
  const [active, setActive] = useState(false);

  const closeOptions = () => {
    setActive(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", closeOptions);

    return () => {
      document.body.removeEventListener("click", closeOptions);
    };
  }, []);

  return (
    <div className={style.container}>
      <div
        className={style.content}
        onClick={(e) => {
          e.stopPropagation();
          setActive(true);
        }}
      >
        <p>{selected.label}</p>
        <div>
          <div className={style.triangle}></div>
        </div>
      </div>
      <ul
        className={classNames(style.options, { [style.active]: active })}
        onClick={() => {
          setActive(false);
        }}
      >
        {data.map((item) => {
          return (
            <li
              key={item.value}
              className={classNames(style.option, { [style.active]: active })}
              onClick={() => {
                setSelected(item);
              }}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;