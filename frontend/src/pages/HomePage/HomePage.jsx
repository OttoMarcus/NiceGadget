import React from "react";
import CardList from "../../Components/CardList/CardList";
import ShopByCategory from "../../Components/ShopByCategory/ShopByCategory";
import style from "./HomePage.module.scss";
import Slider from "../../Components/AdvertisingSlider/Slider";
import BuyForm from "../../Components/BuyForm/BuyForm";

const HomePage = () => {
  const brandNewModels = {
    id: "1234",
    title: "Brand new models",
    picture: "MocPic/iphone1.png",
    refModel: {
      modelId: "iphone-15-pro-max",
      modelName: "iPhone15ProMax",
    },
    name: "Apple iPhone 15 Pro Max 512GB White",
    capacity: "512",
    color: "white",
    price: 1575,
    ram: "8",
    brandNew: true,
    screen: "6.7",
    available: true,
  };

  const hotPrices = {
    id: "5678",
    title: "Hot prices",
    picture: "MocPic/iphone3.png",
    refModel: {
      modelId: "iphone-15-pro-max",
      modelName: "iPhone15ProMax",
    },
    name: "Apple iPhone 15 Pro Max 256GB White",
    capacity: "256",
    color: "white",
    price: 1575,
    ram: "8",
    brandNew: true,
    screen: "6.7",
    available: true,
  };

  return (
    <>
      <h1 className={`${style.container} ${style.homePageTitle}`}>
        Welcome to Nice Gadgets store!
      </h1>

      <section className={`${style.container} ${style.homePageSection}`}>
        <Slider />
      </section>

      <section className={`${style.container} ${style.homePageSection}`}>
        <CardList {...brandNewModels} />
      </section>

      <section className={`${style.container} ${style.homePageSection}`}>
        <ShopByCategory />
      </section>

      <section className={`${style.container} ${style.homePageSection}`}>
        <CardList {...hotPrices} />
      </section>
    </>
  );
};

export default HomePage;
