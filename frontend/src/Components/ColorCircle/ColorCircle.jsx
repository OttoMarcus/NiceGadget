import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./ColorCircle.module.scss";

//info for Link
//Color
const ColorCircle = ({
  hexColor,
  pathname,
  capacity,
  color,
  isActive,
  changeColor,
}) => {
  return (
    <Link
      to={`${pathname}?color=${color}&capacity=${capacity}`}
      onClick={() => changeColor(color)}
    >
      <div
        className={`${styles.circle} ${isActive ? styles.active : ""}`}
        style={{ backgroundColor: hexColor }}
      ></div>
    </Link>
  );
};

ColorCircle.propTypes = {
  hexColor: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  capacity: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  changeColor: PropTypes.func.isRequired,
};

export default ColorCircle;
