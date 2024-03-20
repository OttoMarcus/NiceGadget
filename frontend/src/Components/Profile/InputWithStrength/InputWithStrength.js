import React, { useRef, useState } from "react";
import { ErrorMessage, Field } from "formik";
import { ReactComponent as ShowPassIcon } from "./imgPassword/show-pass.svg";
import { ReactComponent as HidePassIcon } from "./imgPassword/hide-pass.svg";
import PropTypes from "prop-types";
import styles from "./InputWithStrength.module.scss";

const InputWithStrength = ({
  label,
  className,
  placeholder,
  name,
  handleChange,
  error,
  ...props
}) => {
  const [passShown, setPassShown] = useState(false);
  const [percentBar, setPercentBar] = useState("");
  const passwordRef = useRef(null);
  const [passLabel, setPassLabel] = useState("Strength");

  const addClass = (className) => {
    setPercentBar("");
    if (className) {
      setPercentBar(className);
    }
  };
  const togglePassword = () => {
    setPassShown(!passShown);
  };

  const handlePassInput = (e) => {
    const value = passwordRef.current?.value || "";
    if (value.length === 0) {
      setPassLabel("Strength");
      addClass();
    } else if (value.length <= 8) {
      setPassLabel("Weak");
      addClass(styles.weak);
    } else if (value.length <= 11) {
      setPassLabel("Not Bad");
      addClass(styles.average);
    } else {
      setPassLabel("Strong");
      addClass(styles.strong);
    }
  };

  return (
    <>
      <div className={styles.registration__showHide}>
        <label>
          <h3 className={styles.registration__sectionField}>{label}</h3>
          <Field
            innerRef={passwordRef}
            type={passShown ? "text" : "password"}
            name={name}
            {...props}
            className={styles.registration__sectionInput}
            onBlur={handlePassInput}
            placeholder={placeholder}
          />
          <ErrorMessage className="error" name={name} component={"p"} />
          {passShown ? (
            <HidePassIcon
              className={styles.registration__showHide__icon}
              onClick={togglePassword}
            />
          ) : (
            <ShowPassIcon
              className={styles.registration__showHide__icon}
              onClick={togglePassword}
            />
          )}
        </label>
      </div>
      <div className={styles.passStrength}>
        <div className={styles.strengthPercent}>
          <span className={percentBar}></span>
        </div>
        <span className={styles.strengthLabel}>{passLabel}</span>
      </div>
    </>
  );
};

InputWithStrength.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default InputWithStrength;
