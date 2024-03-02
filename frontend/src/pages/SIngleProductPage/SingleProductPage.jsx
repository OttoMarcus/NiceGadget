import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
      {model && (
        <div className={styles.container}>
          <h2 className={styles.productTitle}>
            {model?.name} {color} {capacity} GB
          </h2>
          <div className={styles.content}>
            <div className={styles.imagesAndCustomizationWrapper}>
              <div className={styles.outerImagesWrapper}>
                <SelectableImageGallery images={byColor.pictures} />
              </div>
              <div className={styles.outerCustomizationWrapper}>
                <div className={styles.productCustomizationWrapper}>
                  <h4 className={styles.customizationHeader}>
                    Available colors
                  </h4>
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
                  <div>
                    <h4 className={styles.customizationHeader}>
                      Select capacity
                    </h4>
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
                  </div>
                  <div className={styles.priceWrapper}>
                    {chosenCapacityObject.discount ? (
                      <>
                        <div className={styles.actualPrice}>
                          $
                          {Math.round(
                            chosenCapacityObject.price *
                              (1 - chosenCapacityObject.discount)
                          )}
                        </div>
                        <div className={styles.priceCheck}>
                          ${chosenCapacityObject.price}
                        </div>
                      </>
                    ) : (
                      <div className={styles.actualPrice}>
                        ${chosenCapacityObject.price}
                      </div>
                    )}
                  </div>
                  <div className={styles.buttonsWrapper}>
                    <Button
                      onClick={() => {}}
                      isAvailable={chosenCapacityObject?.available}
                    />
                    <Favorite
                      click={() => {
                        console.log(chosenCapacityObject?.productId);
                        console.log(capacity);
                        console.log(color);
                        console.log(model?.name);
                        console.log(byColor?.pictures[0]?.link);
                        console.log(chosenCapacityObject?.price);
                        console.log(
                          chosenCapacityObject?.discount
                            ? chosenCapacityObject?.discount
                            : "no discount"
                        );
                        console.log(
                          model?.techSpecs[0]?.specName,
                          model?.techSpecs[0]?.specDescription
                        );
                        console.log(
                          model?.techSpecs[3]?.specName,
                          model?.techSpecs[0]?.specDescription
                        );
                        console.log("refModel", modelId);
                        console.log("category", typeModel);
                      }}
                    />
                  </div>
                  <div>
                    <TechSpecs
                      techSpecs={
                        model?.techSpecs.length > 4
                          ? model?.techSpecs.slice(0, 4)
                          : model?.techSpecs
                      }
                      capacity={capacity}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.aboutAndTechSpecsWrapper}>
              <div className={styles.aboutSection}>
                <h3 className={styles.aboutHeader}>About</h3>
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
              <div className={styles.techSpecsSection}>
                <h3 className={styles.techSpecsHeader}>Tech specs</h3>
                <TechSpecs techSpecs={model?.techSpecs} capacity={capacity} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductPage;
