import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./Input.module.scss";
import PropTypes from "prop-types";

const Input = ({
  type,
  label,
  className,
  placeholder,
  name,
  error,
  ...props
}) => {
  return (
    <label>
      <h3 className={styles.registration__sectionField}>{label}</h3>
      <Field
        type={type}
        name={name}
        {...props}
        placeholder={placeholder}
        className={className}
      />
      <ErrorMessage className={styles.error} name={name} component={"p"} />
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Input;
