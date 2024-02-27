import React from "react";
import PropTypes from "prop-types";
import Style from "./Button.module.scss";

const Button = ({ btnName }) => {
  return <button className={Style.button}>{btnName}</button>;
};

Button.propTypes = {
  btnName: PropTypes.string,
};
export default Button;
