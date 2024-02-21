import React from "react";
import Carousel from "../../Components/Carousel/Carousel";
import CardList from "../../Components/CardList/CardList";
import ShopByCategory from "../../Components/ShopByCategory/ShopByCategory";
import Style from "./HomePage.module.scss";

const HomePage = () => {
  const brandNewModels = {
    title: "Brand new models",
    imageSrc: "MocPic/iphone1.png",
    model: "Apple iPhone 14 Pro 128GB Silver (MQ023)",
    price: 999,
    screen: "6.1” OLED",
    capacity: "128 GB",
    ram: "5 GB",
  };

  const hotPrices = {
    title: "Hot prices",
    imageSrc: "MocPic/iphone3.png",
    model: "Apple iPhone 13 Pro 64GB Grey (MQ023)",
    price: 888,
    screen: "6.1” OLED",
    capacity: "64 GB",
    ram: "6 GB",
  };

  const totalByCategory = {
    totalPhones: 100,
    totalTablets: 200,
    totalAccessories: 300,
  };

  return (
    <>
      <h1 className={Style.container}>Welcome to Nice Gadgets store!</h1>

      <section>
        <Carousel />
      </section>

      <section className={Style.container}>
        <CardList {...brandNewModels} />
      </section>

      <section className={Style.container}>
        <ShopByCategory {...totalByCategory} />
      </section>

      <section className={Style.container}>
        <CardList {...hotPrices} />
      </section>
    </>
  );
};

export default HomePage;
