import Tag from "components/atoms/tag";
import style from "./index.module.css";

const TagList = ({ data, emptyStateText = null, onRemoveItem }) => {
  if (data.length === 0) {
    return <div>{emptyStateText}</div>;
  }

  return (
    <ul className={style.container}>
      {data.map((item) => (
        <li className={style.item} key={item}>
          <Tag label={item.label} onRemove={() => onRemoveItem(item)} />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
