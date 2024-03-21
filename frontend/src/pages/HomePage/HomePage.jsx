import React from "react";
import CardList from "../../Components/CardList/CardList";
import ShopByCategory from "../../Components/ShopByCategory/ShopByCategory";
import style from "./HomePage.module.scss";
import Slider from "../../Components/AdvertisingSlider/Slider";
import FAQchat from "../../Components/FAQchat/FAQchat";
import { useState } from "react";
import Icon from "../../Components/FAQchat/Image/support.gif";
import IconClose from "../../Components/FAQchat/Image/letter-x.gif";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsIconVisible(!isIconVisible);
  };

  const closeIcon = () => {
    setIsModalOpen(false);
    setIsIconVisible(true);
  };

  return (
    <>
      <h1 className={`${style.container} ${style.homePageTitle}`}>
        Welcome to Nice Gadgets store!
      </h1>

      <section className={`${style.container}`}>
        {isIconVisible && (
          <div className={style.helpIcon}>
            <img
              className={style.support}
              src={Icon}
              onClick={toggleModal}
              alt="Support Icon"
            />
            <p className={style.help}>Need Help ?</p>
          </div>
        )}

        {isModalOpen && (
          <div className={style.modalOverlay}>
            <div className={style.modal}>
              <img
                src={IconClose}
                className={style.close}
                onClick={closeIcon}
                alt="Close Icon"
              />
              <FAQchat />
            </div>
          </div>
        )}
      </section>

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
