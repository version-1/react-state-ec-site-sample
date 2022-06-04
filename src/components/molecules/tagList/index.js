import Tag from "components/atoms/tag";
import style from "./index.module.css";

const TagList = ({ data }) => {
  return (
    <ul className={style.container}>
      {data.map((item) => (
        <li className={style.item} key={item}>
          <Tag label={item} />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
