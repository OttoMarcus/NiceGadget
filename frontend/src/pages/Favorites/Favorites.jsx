import React from "react";
import Style from "./Favorites.module.scss";
import Card from "../../Components/Card/Card";
import { useSelector } from "react-redux";
import CardAccessories from "../../Components/CardAccessories/CardAccessories";

const Favorites = () => {
  const favor = useSelector((state) => state.favorite?.favorites);

  return (
    <div className={Style.wrapper}>
      <div className={Style.wrapperTitle}>
        <h2>Favorites</h2>
      </div>
      <div className={Style?.favoritesOutLet}>
        {favor.length !== 0 ? (
          favor.map((el) => {
            const screen = el.screen?.split(` `);

            if (el.category === `phones`) {
              return (
                <div key={el.id}>
                  <Card
                    key={el?._id}
                    id={el.id}
                    _id={el._id}
                    picture={el.picture}
                    name={el.name}
                    price={el.price}
                    screen={screen[0]}
                    capacity={el?.capacity}
                    ram={el?.ram[0]}
                    refModel={el?.refModel}
                    color={el.color}
                    category={el.category}
                    available={el.available}
                  />
                </div>
              );
            } else if (el.category === `tablets`) {
              return (
                <div key={el.id}>
                  <Card
                    key={el?.id}
                    id={el.id}
                    picture={el.picture}
                    name={el.name}
                    price={el.price}
                    screen={screen[0]}
                    capacity={el.capacity}
                    ram={el?.ram[0]}
                    refModel={el.refModel}
                    color={el.color}
                    category={el.category}
                    available={el.available}
                  />
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
