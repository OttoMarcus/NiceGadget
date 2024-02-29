import React from "react";
import PropTypes from "prop-types";
import styles from "./AccessoriesTechSpecs.module.scss";

const TechSpecsCard = ({ specs }) => {
  return (
    <div className={styles.specContainer}>
      <div className={styles.divider}></div>
      {specs.map((spec, index) => (
        <div className={styles.paramsGroup} key={index}>
          <p className={styles.title}>{spec.specName}</p>
          <p className={styles.description}>{spec.specDescription}</p>
        </div>
      ))}
    </div>
  );
};

TechSpecsCard.propTypes = {
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      specName: PropTypes.string.isRequired,
      specDescription: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TechSpecsCard;
