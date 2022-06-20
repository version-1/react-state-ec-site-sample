import { useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import classNames from "classnames";
import style from "./index.module.css";

const Section = ({ title, children, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={style.container}>
      <div className={style.header} onClick={() => setOpen((open) => !open)}>
        <h3>{title}</h3>
        <div className={style.toggle}>{open ? <IoRemove /> : <IoAdd />}</div>
      </div>
      <div className={classNames(style.content, { [style.open]: open })}>
        {children}
      </div>
    </section>
  );
};

export default Section;
