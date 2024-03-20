import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import Card from "../Card/Card";
import style from "./CardList.module.scss";
import PropTypes from "prop-types";
import React, { useRef } from "react";

const CardList = (props) => {
  const { title, ...cardParams } = props;
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 600,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 600,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className={style.header}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.btnGroup}>
          <div className={style.arrow} onClick={scrollLeft}>
            <LeftArrowIcon />
          </div>
          <div className={style.arrow} onClick={scrollRight}>
            <RightArrowIcon />
          </div>
        </div>
      </div>
      <div className={style.cardsContainer} ref={containerRef}>
        <Card {...cardParams} />
        <Card {...cardParams} />
        <Card {...cardParams} />
        <Card {...cardParams} />
        <Card {...cardParams} />
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
