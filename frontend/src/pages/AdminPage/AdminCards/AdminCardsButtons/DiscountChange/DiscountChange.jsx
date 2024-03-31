import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styles from "./DiscountChange.module.scss";

const DiscountChange = ({ category, id, onClick }) => {
  const [discountInputValue, setDiscountInputValue] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const handleInputChange = (event) => {
    setDiscountInputValue(event.target.value);
    const newPercentage = event.target.value;

    if (newPercentage !== "") {
      const parsedPercentage = parseFloat(newPercentage);
      const sanitizedPercentage = Math.min(100, Math.max(0, parsedPercentage));
      setDiscountPercentage(sanitizedPercentage / 100);
    } else {
      setDiscountPercentage(0);
    }
  };

  const handleUpdate = () => {
    const token = localStorage?.getItem("token");
    axios
      .put(
        `/api/${category}/${id}`,
        { discount: discountPercentage },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log("Discount updated successfully:", response.data);
        onClick(discountPercentage);
      })
      .catch((err) => {
        console.error("Error updating discount:", err);
      });
  };

  return (
    <div className={styles.discountButtonsWrapper}>
      <div className={styles.adjustDiscountWrapper}>
        <input
          type="number"
          value={discountInputValue}
          onChange={handleInputChange}
          min={0}
          max={100}
          className={styles.inputField}
        />
        <span className={styles.percentage}>%</span>
      </div>
      <button
        onClick={handleUpdate}
        className={`${discountInputValue === "" ? styles.disabled : ""} ${styles.updateButton}`}
      >
        Update
      </button>
    </div>
  );
};

DiscountChange.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DiscountChange;
