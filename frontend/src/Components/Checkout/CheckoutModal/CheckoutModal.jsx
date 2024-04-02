import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutModal.module.scss";
import CloseIcon from "../../Icons/CloseIcon";
import Button from "../../Button/Button";
import PropTypes from "prop-types";

const CheckoutModal = ({ close, validationResults }) => {
  const navigate = useNavigate();

  const handleBackToCart = () => {
    close();
    navigate("/cart");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.checkoutModal}>
        <button onClick={close} className={styles.closeButton}>
          <CloseIcon />
        </button>
        {validationResults.filter((item) => item.availableQuantity === 0)
          .length > 0 && (
          <div className={styles.textSection}>
            <p className={styles.textParagraph}>
              Some items in cart are currently out of stock:
            </p>
            <ul className={styles.textList}>
              {validationResults
                .filter((item) => item.availableQuantity === 0)
                .map((product) => (
                  <li className={styles.textListItem} key={product.customId}>
                    {product.name}
                  </li>
                ))}
            </ul>
          </div>
        )}
        {validationResults.filter((item) => item.availableQuantity > 0).length >
          0 && (
          <div className={styles.textSection}>
            <p className={styles.textParagraph}>
              Some cart items quantity is greater than in stock:
            </p>
            <ul className={styles.textList}>
              {validationResults
                .filter((item) => item.availableQuantity > 0)
                .map((product) => (
                  <li className={styles.textListItem} key={product.customId}>
                    {product.name}, cart quantity: {product.cartQuantity}, in
                    stock: {product.availableQuantity}
                  </li>
                ))}
            </ul>
          </div>
        )}
        <p className={styles.textMessage}>
          Please update your cart to continue the checkout process
        </p>
        <div className={styles.backToCartButtonWrp}>
          <Button onClick={handleBackToCart}>Back to Cart</Button>
        </div>
      </div>
    </div>
  );
};

CheckoutModal.propTypes = {
  close: PropTypes.func.isRequired,
  validationResults: PropTypes.array.isRequired,
};

export default CheckoutModal;
