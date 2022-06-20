import style from "./index.module.css";

const RadioGroup = ({ name, data, value, onClick }) => {
  return (
    <ul>
      {data.map((item) => {
        return (
          <li key={item.label} className={style.item}>
            <label>
              <input
                type="radio"
                className={style.radio}
                name={name}
                onClick={() => {
                  onClick(item);
                }}
                checked={item.value === value}
              />
              {item.label}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default RadioGroup;
