import style from "./index.module.css";

export default function Loader() {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}></div>
    </div>
  );
}
