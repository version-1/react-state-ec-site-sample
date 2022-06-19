import style from "./index.module.css";

const RadioGroup = ({ name, data }) => {
  return (
    <ul>
      {data.map((item) => {
        return (
          <li key={item.label} className={style.item}>
            <label>
              <input type="radio" className={style.radio} name={name}/>{item.label}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default RadioGroup;
