import React, { useState, useEffect, useCallback } from "react";
import styles from "./Slider.module.scss";
import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import axios from "axios";
import { Link } from "react-router-dom";
import Star from "./Star/Star";
import Sakura from "./Sakura/Sakura";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliders, setSliders] = useState(null);

  useEffect(() => {
    axios
      .get("/api/advertising-sliders")
      .then((response) => {
        setSliders(response.data.data);
      })
      .catch((error) => {
        console.error("There was a problem with fetch:", error);
      });
  }, []);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? sliders.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const newIndex = currentIndex === sliders.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, sliders]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, nextSlide]);

  useEffect(() => {
    if (sliders !== null) {
    }
  }, [sliders]);

  const renderSliderContent = (slider) => {
    if (!slider) return null;

    switch (slider.type) {
      case "type1":
        return (
          <div className={styles.slider}>
            <Star />
            <div className={styles.bannerWrapper}>
              <div className={styles.item}>
                <img
                  className={styles.miniImgFirst}
                  src={slider.miniImg}
                  alt="miniPhone"
                />
              </div>

              <div className={styles.infoWrapper}>
                <h2 className={styles.titleFirst}>{slider.title}</h2>
                <Link to="/phones" className={styles.linkBtn}>
                  Learn More
                </Link>
                <p className={styles.subtitleFirst}>
                  {sliders[currentIndex].subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      case "type2":
        return (
          <div className={styles.sliderSecond}>
            <div className={styles.bannerWrapperSecond}>
              <div className={styles.infoWrapper}>
                <h2 className={styles.titleSecond}>{slider.title}</h2>
                <Link to="/phones" className={styles.linkBtnSecond}>
                  Learn More
                </Link>
                <p className={styles.subtitleSecond}>
                  {sliders[currentIndex].subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      case "type3":
        return (
          <div className={styles.sliderThird}>
            <div className={styles.bannerWrapperSecond}>
              <div className={styles.infoWrapper}>
                <h2 className={styles.titleThird}>{slider.title}</h2>
                <Link to="/phones" className={styles.linkBtnThird}>
                  Buy
                </Link>
                <Sakura />
                <p className={styles.subtitleThird}>
                  {sliders[currentIndex].subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {sliders && sliders.length > 0 && sliders[currentIndex] && (
        <div className={styles.sliderWrapper}>
          <div className={styles.leftArrow} onClick={prevSlide}>
            <LeftArrowIcon />
          </div>
          <div>{renderSliderContent(sliders[currentIndex])}</div>
          <div className={styles.rightArrow} onClick={nextSlide}>
            <RightArrowIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;
