import React from "react";
import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import DeleteIcon from "../Icons/Close";
import Minus from "../Icons/Minus";
import Plus from "../Icons/Plus";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../store/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const calculateTotalItemPrice = (price, discount = 0, quantity) => {
    return Math.round(price * (1 - discount) * quantity);
  };

  const totalItemPrice = calculateTotalItemPrice(
    item.price,
    item.discount,
    item.quantity
  );

  const getPath = () => {
    switch (item.category) {
      case "phones":
        return `/phones/${item.refModel.modelId}?color=${item.color}&capacity=${item.capacity}`;
      case "tablets":
        return `/tablets/${item.refModel.modelId}?color=${item.color}&capacity=${item.capacity}`;
      case "accessories":
        return `/accessories/${item.name}?color=${item.color}`;
      default:
        return "/";
    }
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity({ category: item.category, id: item.id }));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity({ category: item.category, id: item.id }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ category: item.category, id: item.id }));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemInfo}>
        <button onClick={handleRemove} className={styles.deleteButton}>
          <DeleteIcon />
        </button>
        <Link to={getPath()} className={styles.cartItemLink}>
          <div className={styles.cartItemImg}>
            <img src={item.picture} alt={item.name} />
          </div>
          <div className={styles.cartItemName}>{item.name}</div>
        </Link>
      </div>
      <div className={styles.counterPriceWrapper}>
        <div className={styles.counter}>
          <button onClick={handleDecrement}>
            <Minus />
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button onClick={handleIncrement}>
            <Plus />
          </button>
        </div>
        <h2 className={styles.totalItemPrice}>{`$${totalItemPrice}`}</h2>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    quantity: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    color: PropTypes.string,
    capacity: PropTypes.string,
    refModel: PropTypes.shape({
      modelId: PropTypes.string.isRequired,
      modelName: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

CartItem.defaultProps = {
  item: {
    discount: 0,
    color: "",
    capacity: "",
    refModel: {},
  },
};

export default CartItem;
