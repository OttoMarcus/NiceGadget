import React from "react";
import Carousel from "../../Components/Carousel/Carousel";
import CardList from "../../Components/CardList/CardList";
import ShopByCategory from "../../Components/ShopByCategory/ShopByCategory";
import Style from "./HomePage.module.scss";

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

  const totalByCategory = {
    totalPhones: 100,
    totalTablets: 200,
    totalAccessories: 300,
  };

  return (
    <>
      <h1 className={Style.container}>Welcome to Nice Gadgets store!</h1>

      <section className={Style.container}>
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
