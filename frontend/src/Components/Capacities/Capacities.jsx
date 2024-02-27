import React from "react";
import PropTypes from "prop-types";
import styles from "./Capacities.module.scss";
import { Link } from "react-router-dom";

const Capacities = ({
  pathname,
  color,
  capacityOption,
  actualCapacity,
  capacityChange,
}) => {
  return (
    <Link
      to={`${pathname}?color=${color}&capacity=${capacityOption}`}
      onClick={() => capacityChange(capacityOption)}
    >
      <div
        className={`${actualCapacity === capacityOption ? styles.capacityActive : styles.capacitiesItem}`}
      >
        {capacityOption} GB
      </div>
    </Link>
  );
};

Capacities.propTypes = {
  pathname: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  capacityOption: PropTypes.string.isRequired,
  actualCapacity: PropTypes.string.isRequired,
  capacityChange: PropTypes.func.isRequired,
};

export default Capacities;
