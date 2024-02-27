import React from "react";
import { Link } from "react-router-dom";
import Style from "./AccessoriesCard.module.scss";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";

const AccessoriesCard = () => {
  return (
    <Link to={`/accessories/`}>
      <div className={Style.card}>
        <div className={Style.cardImg}>
          <img src="" alt="Card" />
        </div>
        <div className={Style.model}>{}</div>
        <div className={Style.price}>${}</div>
        <div className={Style.divider}></div>
        <ul className={Style.paramsGroup}>
          <li>
            <p>Color</p>
            <p>{}</p>
          </li>
          <li>
            <p>Weight</p>
            <p>{}</p>
          </li>
          <li>
            <p>Size</p>
            <p>{}</p>
          </li>
        </ul>
        <div className={Style.buttonWrapper}>
          <Button btnName={"Add cart"} />
          <Favorite />
        </div>
      </div>
    </Link>
  );
};

// AccessoriesCard.propTypes = {
//     picture: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     screen: PropTypes.string,
//     capacity: PropTypes.string,
//     ram: PropTypes.string,
//     brandNew: PropTypes.bool,
//     refModel: PropTypes.shape({
//         modelId: PropTypes.string.isRequired,
//         modelName: PropTypes.string.isRequired,
//     }).isRequired,
//     color: PropTypes.string.isRequired,
//     available: PropTypes.bool.isRequired,
// };

export default AccessoriesCard;
