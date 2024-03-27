import React from "react";
import CardList from "../../Components/CardList/CardList";
import ShopByCategory from "../../Components/ShopByCategory/ShopByCategory";
import style from "./HomePage.module.scss";
import Slider from "../../Components/AdvertisingSlider/Slider";
import BrandNews from "../../Components/BrandNews/BrandNews";
import NeedHelp from "../../Components/FAQchat/Needhelp";

const HomePage = () => {
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

      <section className={`${style.container}`}>
        <NeedHelp />
      </section>

      <section className={`${style.container} ${style.homePageSection}`}>
        <Slider />
      </section>

      <section className={`${style.container} ${style.homePageSection}`}>
        <BrandNews />
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
