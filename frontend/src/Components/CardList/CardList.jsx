import React from "react";
import LeftArrow from "../Icons/LeftArrow";
import RightArrow from "../Icons/RightArrow";
import Card from "../Card/Card";
import style from "./CardList.module.scss";
import PropTypes from "prop-types";

const CardList = (props) => {
  const { title, ...cardParams } = props;

  return (
    <>
      <div className={style.header}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.btnGroup}>
          <div>
            <LeftArrow />
          </div>
          <div>
            <RightArrow />
          </div>
        </div>
      </div>
      <div className={style.cardsContainer}>
        <Card {...cardParams} />
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
  cardParams: PropTypes.object,
  title: PropTypes.string,
};

export default CardList;
