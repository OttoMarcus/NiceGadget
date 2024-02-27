import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import styles from "./SingleProductPage.module.scss";
import ColorCircle from "../../Components/ColorCircle/ColorCircle";
import SelectableImageGallery from "../../Components/SelectableImageGallery/SelectableImageGallery";
import Capacities from "../../Components/Capacities/Capacities";
import ProductAbout from "../../Components/ProductAbout/ProductAbout";
import TechSpecs from "../../Components/ProductTechSpecs/ProductTechSpecs";
import Button from "../../Components/Button/Button";
import Favorite from "../../Components/Favorite/Favorite";

const SingleProductPage = () => {
  const { modelId } = useParams();
  const location = useLocation();
  const pathname = location.pathname;

  const queryParams = new URLSearchParams(location.search);
  const [color, setColor] = useState(queryParams.get("color"));
  const [capacity, setCapacity] = useState(queryParams.get("capacity"));

  const [model, setModel] = useState();

  const arr = useMemo(() => pathname.split("/"), [pathname]);
  const typeModel = arr[arr.length - 2];

  const byColor = useMemo(() => {
    if (model) {
      return model?.colors.find((el) => el.colorName === color);
    }
    return null;
  }, [model, color]);

  const chosenCapacityObject = byColor?.capacities.find(
    (capacitiesObj) => capacitiesObj?.capacity === capacity
  );

  const handleCapacityClick = (capacity) => setCapacity(capacity);
  const handleColorClick = (color) => setColor(color);

  useEffect(() => {
    fetch(`http://localhost:4000/api/${typeModel}-models/${modelId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setModel(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [pathname, modelId, typeModel]);

  return (
    <>
      <div className={styles.testBox}>
        <h2 className={styles.tittle}>This is SingleProductPage </h2>
        <Link className={styles.linksBtn} to="/">
          Home
        </Link>
      </div>
      {model && (
        <div className={styles.container}>
          <h3>
            {model?.name} {color} {capacity} GB
          </h3>
          <div className={styles.content}>
            <SelectableImageGallery images={byColor.pictures} />
            <div className={styles.contentProduct}>
              <h4 className={styles.colorsTitle}>Available colors</h4>
              <div className={styles.availableColors}>
                {model?.colors.map((el) => {
                  return (
                    <ColorCircle
                      key={el.colorName}
                      hexColor={el.hexColor}
                      color={el.colorName}
                      isActive={el.colorName === color}
                      pathname={pathname}
                      capacity={capacity}
                      changeColor={handleColorClick}
                      availabilityArr={el.capacities}
                    />
                  );
                })}
              </div>
              <div className={styles.capacities}>
                {byColor.capacities.map((el, index) => {
                  return (
                    <Capacities
                      key={index}
                      capacityChange={handleCapacityClick}
                      color={color}
                      pathname={pathname}
                      capacityOption={el?.capacity}
                      actualCapacity={capacity}
                      availability={el?.available}
                    />
                  );
                })}
              </div>
              <div className={styles.priceWrapper}>
                <h3>Price</h3>
                <span
                  className={`${chosenCapacityObject.discount ? styles.priceCheck : styles.actualPrice}`}
                  style={{ marginRight: 20 }}
                >
                  ${chosenCapacityObject.price}
                </span>
                <span className={styles.actualPrice}>
                  {chosenCapacityObject.discount &&
                    `$${
                      chosenCapacityObject.price *
                      (1 - chosenCapacityObject.discount)
                    }`}
                </span>
              </div>
              <div className={styles.buttonsWrapper}>
                <Button
                  onClick={() => {}}
                  isAvailable={chosenCapacityObject?.available}
                />
                <Favorite />
              </div>
            </div>
            <div className={styles.contentProduct}>
              <h3>About</h3>
              {model?.about.map((item, index) => {
                return (
                  <ProductAbout
                    key={index}
                    text={item.text}
                    title={item.title}
                  />
                );
              })}
            </div>
            <div className={styles.contentProduct}>
              <h3>Tech specs</h3>
              <TechSpecs techSpecs={model?.techSpecs} capacity={capacity} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductPage;
