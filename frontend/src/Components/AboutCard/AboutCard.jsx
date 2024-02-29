import React from "react";
import PropTypes from "prop-types";
import styles from "./AboutCard.module.scss";

const AboutCard = ({ about }) => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.divider}></div>
      {about.map((info, index) => (
        <div key={index}>
          <h4 className={styles.aboutTitle}>{info.title}</h4>
          <p className={styles.aboutDescription}>{info.text}</p>
        </div>
      ))}
    </div>
  );
};

AboutCard.propTypes = {
  about: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AboutCard;
