import styles from './index.module.css'

const Button = (
  { variant, label, onClick } = { variant: "default", onClick: () => {} }
) => {
  return (
    <button className={[styles.base]} type="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
