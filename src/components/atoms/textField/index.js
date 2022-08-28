import styles from "./index.module.css";

export function TextField(props) {
  const { label, errorMessage, ...rest } = props;

  return (
    <div className={styles.textFieldContainer}>
      {label && <label className={styles.textFieldLabel}>{label}</label>}
      <TextInput {...rest} />
      <ErrorMessages message={errorMessage} />
    </div>
  );
}

export function TextInput(props) {
  return (
    <input
      className={styles.input}
      type="text"
      {...props}
      disabled={props.readOnly}
    />
  );
}

function ErrorMessages({ message }) {
  if (!message) {
    return <p>&nbsp;</p>;
  }

  return <p className={styles.errorMessages}>{message}</p>;
}
