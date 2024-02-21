import React from "react";
import Style from "./HomePage.module.scss";
// import PropTypes from "prop-types";

const HomePage = () => {
  //   const brandNewModels = {
  //     title: "Brand new models",
  //     imageSrc: "MocPic/iphone1.png",
  //     model: "Apple iPhone 14 Pro 128GB Silver (MQ023)",
  //     price: 999,
  //     screen: "6.1” OLED",
  //     capacity: "128 GB",
  //     ram: "6 GB",
  //   };
  //
  //   const hotPrices = {
  //     title: "Hot prices",
  //     imageSrc: "MocPic/iphone3.png",
  //     model: "Apple iPhone 13 Pro 64GB Grey (MQ023)",
  //     price: 888,
  //     screen: "6.1” OLED",
  //     capacity: "64 GB",
  //     ram: "6 GB",
  //   };
  //
  //   const totalByCategory = {
  //     totalPhones: 100,
  //     totalTablets: 200,
  //     totalAccessories: 300,
  //   };

  return (
    <>
      <h1 className={Style.container}>Welcome to Nice Gadgets store!</h1>

      <section></section>

      <section className={Style.container}></section>

      <section className={Style.container}></section>

      <section className={Style.container}></section>
    </>
  );
};

// HomePage.propTypes = {
//   brandNewModels: PropTypes.object.isRequired,
//   hotPrices: PropTypes.object.isRequired,
//   totalByCategory: PropTypes.object.isRequired,
// };

export default HomePage;
