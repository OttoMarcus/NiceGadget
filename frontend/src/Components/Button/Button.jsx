import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ onClick, children, backgroundColor, disabled }) => {
  const buttonStyle = {
    backgroundColor,
  };

  return (
    <button
      style={buttonStyle}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
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
