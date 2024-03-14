import React, { useState, useEffect, useCallback } from "react";
import styles from "./Slider.module.scss";
import LeftArrow from "../Icons/LeftArrow";
import RightArrow from "../Icons/RightArrow";
import axios from "axios";
import { Link } from "react-router-dom";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliders, setSliders] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/advertising-sliders")
      .then((response) => {
        setSliders(response.data.data);
        console.log(response.data.data);
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

  return (
    <div
      className={`${styles.slider} ${styles.imageContainer}`}
      style={{
        backgroundImage:
          sliders && sliders.length > 0 && sliders[currentIndex].pictures[0]
            ? `url(${sliders[currentIndex].pictures[0].link})`
            : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {sliders && sliders.length > 0 && sliders[currentIndex] && (
        <>
          <div className={styles.leftArrow} onClick={prevSlide}>
            <LeftArrow />
          </div>
          <div className={styles.sliderContent}>
            <h2 className={styles.title}>{sliders[currentIndex].title}</h2>
            <p className={styles.subtitle}>{sliders[currentIndex].subtitle}</p>
            <Link to="/phones" className={styles.link}>
              Learn More
            </Link>
          </div>
          <div className={styles.rightArrow} onClick={nextSlide}>
            <RightArrow />
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;
