import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ItemsPerPage.module.scss";

const options = [6, 12, 24];
const ItemsPerPage = ({ onChange, value }) => {
  const [showList, setShowList] = useState(false);

  return (
    <div className={styles.perPageWrapper}>
      <p
        onClick={() => setShowList((prev) => !prev)}
        className={`${!showList ? "" : styles.hidden}`}
      >
        {value}
      </p>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              onChange(option);
              setShowList((prev) => !prev);
            }}
            className={`${option === value ? "selected" : ""} ${showList ? "" : styles.hidden}`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

ItemsPerPage.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default ItemsPerPage;
