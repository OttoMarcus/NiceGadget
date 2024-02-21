import React from "react";
import LeftArrow from "../Icons/LeftArrow";
import RightArrow from "../Icons/RightArrow";
import Card from "../Card/Card";
import Style from "./CardList.module.scss";
import PropTypes from "prop-types";

const CardList = (props) => {
  const { title, ...cardParams } = props;

  return (
    <>
      <div className={Style.header}>
        <h2 className={Style.title}>{title}</h2>
        <div className={Style.btnGroup}>
          <div>
            <LeftArrow />
          </div>
          <div>
            <RightArrow fill={"#F1F2F9"} />
          </div>
        </div>
      </div>
      <div className={Style.cardsContainer}>
        <Card {...cardParams} />
        <Card {...cardParams} />
        <Card {...cardParams} />
        <Card {...cardParams} />
        <Card {...cardParams} />
      </div>
    </>
  );
};

CardList.propTypes = {
  cardParams: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardList;
