import { IoClose } from "react-icons/io5";
import style from "./index.module.css";

const Tag = ({ label, onRemove }) => {
  return (
    <div className={style.container}>
      <p className={style.label}>{label}</p>
      <IoClose onClick={onRemove} />
    </div>
  );
};

export default Tag;
