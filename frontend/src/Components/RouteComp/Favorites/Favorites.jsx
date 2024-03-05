import React from "react";
import Style from "./Favorites.module.scss";
import Card from "../../Card/Card";
import { useSelector } from "react-redux";
import CardAccessories from "../../CardAccessories/CardAccessories";

const Favorites = () => {
  const favor = useSelector((state) => state.favorite.favorites);

  return (
    <div className={Style.wrapper}>
      <div className={Style.wrapperTitle}>
        <h2>Favorites</h2>
      </div>
      <div className={Style.favoritesOutLet}>
        {favor.length !== 0 ? (
          favor.map((el) => {
            console.log(el.category);
            if (el.category === `phones`) {
              return (
                <div key={el.id}>
                  <Card key={el.id} {...el} />
                </div>
              );
            } else if (el.category === `tablets`) {
              return (
                <div key={el.id}>
                  <Card key={el.id} {...el} />
                </div>
              );
            } else {
              //(el.category === `accessories`)
              return (
                <div key={el.id}>
                  <CardAccessories key={el.id} {...el} />
                </div>
              );
            }
          })
        ) : (
          <p>you didnt choose nothing</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
