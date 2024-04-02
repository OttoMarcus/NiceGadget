import React from "react";
// import CardList from "../../Components/CardList/CardList";
import ShopByCategory from "../../Components/ShopByCategory/ShopByCategory";
import Slider from "../../Components/AdvertisingSlider/Slider";
import BrandNews from "../../Components/BrandNews/BrandNews";
import NeedHelp from "../../Components/FAQchat/Needhelp";
import HotPrices from "../../Components/HotPrices/HotPrices";

import style from "./HomePage.module.scss";
const HomePage = () => {
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
        <HotPrices />
      </section>
    </>
  );
};

export default HomePage;
