import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ onClick, children, backgroundColor }) => {
  const buttonStyle = {
    backgroundColor,
  };

  return (
    <button style={buttonStyle} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  backgroundColor: "#905BFF",
};

export default Button;
