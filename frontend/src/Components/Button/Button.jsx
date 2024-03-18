import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ onClick, children, backgroundColor, disabled, type }) => {
  const buttonStyle = {
    backgroundColor,
    disabled,
  };

  return (
    <button
      type={type}
      style={buttonStyle}
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  backgroundColor: "#905BFF",
  disabled: false,
};

export default Button;
