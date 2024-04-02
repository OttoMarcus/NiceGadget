import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styles from "./QuantityChange.module.scss";

const QuantityChange = ({
  category,
  id,
  name,
  quantity: actualQuantity,
  onClick,
}) => {
  const [newQuantity, setNewQuantity] = useState(0);
  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (!isNaN(newValue)) {
      setNewQuantity(parseInt(newValue));
    }
  };

  const handleIncrement = () => {
    setNewQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (newQuantity + actualQuantity > 0) {
      setNewQuantity((prev) => prev - 1);
    }
  };

  const handleUpdate = () => {
    const token = localStorage?.getItem("token");
    if (category === "phones" || category === "tablets") {
      axios
        .put(
          `http://localhost:4000/api/${category}-models-quantity/admin/${id}`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("Quantity updated successfully:", response.data);
          onClick(newQuantity);
        })
        .catch((err) => {
          console.error("Error updating quantity:", err);
        });
    }

    if (category === "accessories") {
      axios
        .put(
          `http://localhost:4000/api/${category}-models-quantity/admin/${name}`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("Quantity updated successfully:", response.data);
          onClick(newQuantity);
        })
        .catch((err) => {
          console.error("Error updating quantity:", err);
        });
    }
    setNewQuantity(0);
  };

  return (
    <div className={styles.quantityButtonsWrapper}>
      <div className={styles.adjustQuantityWrapper}>
        <button onClick={handleIncrement} className={styles.plusMinus}>
          +
        </button>
        <input
          type="number"
          value={newQuantity || ""}
          onChange={handleInputChange}
          min={-actualQuantity}
          className={styles.inputField}
        />
        <button onClick={handleDecrement} className={styles.plusMinus}>
          -
        </button>
      </div>
      <button
        onClick={handleUpdate}
        className={`${newQuantity === "" || newQuantity === 0 ? styles.disabled : ""} ${styles.updateButton}`}
      >
        Update
      </button>
    </div>
  );
};

QuantityChange.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

QuantityChange.defaultProps = {
  id: "",
  name: "",
};

export default QuantityChange;
