import style from "./index.module.css";
import classNames from "classnames";

const SelectList = ({ data, selected, onClick }) => {
  return (
    <ul className={style.container}>
      {data.map((item) => {
        return (
          <li
            className={classNames(style.item, {
              [style.selected]: selected.some((v) => v.value === item.value),
            })}
            onClick={() => {
              onClick(item);
            }}
          >
            <p>{item.label}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default SelectList;
