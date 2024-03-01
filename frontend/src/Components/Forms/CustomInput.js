import React from "react";
import { useField } from "formik";

const Input = (props) => {
  const [field, meta] = useField(props);
  // console.log(field);
  // console.log(meta.error);
  // console.log(props);

  return (
    <div className="delivery-form__input-block">
      {/* <label htmlFor={props.name} className="delivery-form__label">
        {props.name}
      </label> */}
      <input
        {...field}
        {...props}
        className="delivery-form__input"
        style={{
          borderColor:
            meta.touched && meta.error
              ? "red"
              : meta.touched && !meta.error
                ? "green"
                : "black",
          background: meta.touched && !meta.error ? "#a3f4ad" : "transparent",
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

export default Input;
