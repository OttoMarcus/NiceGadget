import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";

const Input = (props) => {
  const [field, meta] = useField(props);

  return (
    <div className="delivery-form__input-block">
      <label htmlFor={props.name} className="delivery-form__label">
        {props.label}
      </label>
      <input
        {...field}
        {...props}
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
            ? "delivery-form__error-msg"
            : "delivery-form__error-msg hidden"
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
