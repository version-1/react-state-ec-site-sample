import styles from "./index.module.css";
import classNames from "classnames";

const Button = (
  { variant, disabled, label, onClick, style } = {
    variant: "default",
    onClick: () => {},
  }
) => {

  return (
    <button
      className={classNames({
        [styles.base]: true,
        [styles.outline]: variant === "outline",
        [styles.disabled]: disabled
      })}
      disabled={disabled}
      style={style}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
