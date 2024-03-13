import React from "react";
import { useField } from "formik";
import styles from "../Forms/CustomInput.module.scss";
import PropTypes from "prop-types";

const Input = (props) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={props.name} className={styles.inputLabel}>
        {props.label}
      </label>
      <input
        {...field}
        {...props}
        className={styles.inputField}
        style={{
          borderColor:
            meta.touched && meta.error
              ? "red"
              : meta.touched && !meta.error
                ? "green"
                : "black",
          background: meta.touched && !meta.error ? "#a3f4ad" : "white",
        }}
      />
      <p
        className={
          meta.touched && meta.error
            ? `${styles.inputErrMsg}`
            : `${styles.hidden}`
        }
      >
        {meta.error}
      </p>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
