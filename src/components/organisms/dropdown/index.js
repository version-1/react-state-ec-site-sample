import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import style from "./index.module.css";

const disruptiveStyle = "disruptive";

const DropDownMenu = ({ trigger, items }) => {
  const [show, setShow] = useState();

  return (
    <div className={style.wrapper} onMouseLeave={() => setShow(false)}>
      <div onMouseEnter={() => setShow(true)}>{trigger}</div>
      <ul
        className={classNames({
          [style.container]: true,
          [style.show]: show,
        })}
      >
        {items.map((item) => {
          if (item.onClick) {
            return (
              <li
                key={item.key}
                onClick={() => {
                  setShow(false);
                  item.onClick();
                }}
                className={classNames({
                  [style.item]: true,
                  [style.disruptive]: item.style === disruptiveStyle,
                })}
              >
                {item.label}
              </li>
            );
          }

          return (
            <Link key={item.key} to={item.to}>
              <li
                className={classNames({
                  [style.item]: true,
                  [style.disruptive]: item.style === disruptiveStyle,
                })}
              >
                {item.label}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDownMenu;
