import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SelectableImageGallery from "../../Components/SelectableImageGallery/SelectableImageGallery";
import styles from "./SingleAccessoriesPage.module.scss";
import Button from "../../Components/Button/Button";
import Favorite from "../../Components/Favorite/Favorite";
import TechSpecs from "../../Components/ProductTechSpecs/ProductTechSpecs";
import ProductAbout from "../../Components/ProductAbout/ProductAbout";
import { useDispatch, useSelector } from "react-redux";
import { Tooglefavorites } from "../../store/favorites/favoriteSlice";
const SingleAccessoriesPage = () => {
  const { accessoryId } = useParams();
  const [accessories, setAccessories] = useState();

  const dispatch = useDispatch();
  const favor = useSelector((state) => state.favorite.favorites);
  let some = favor.some((el) => accessories?.id === el?.id);
  // let some = 1

  useEffect(() => {
    fetch(`http://localhost:4000/api/accessories-models/${accessoryId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAccessories(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [accessoryId]);

  return (
    <>
      {accessories && (
        <div className={styles.container}>
          <h2 className={styles.productTitle}>{accessories.name}</h2>
          <div className={styles.content}>
            <div className={styles.imagesAndCustomizationWrapper}>
              <div className={styles.outerImagesWrapper}>
                <SelectableImageGallery
                  images={accessories.colors[0].pictures}
                />
              </div>
              <div className={styles.outerCustomizationWrapper}>
                <div className={styles.productCustomizationWrapper}>
                  <div className={styles.priceWrapper}>
                    <div className={styles.actualPrice}>
                      ${accessories.price}
                    </div>
                  </div>
                  <div className={styles.buttonsWrapper}>
                    <Button onClick={() => {}} />
                    <Favorite
                      click={() =>
                        dispatch(
                          Tooglefavorites({
                            id: accessories.id,
                            name: accessories.name,
                            color: accessories.colors[0].colorName,
                            price: accessories.price,
                            picture: accessories.colors[0].pictures[0].link,
                            size: accessories?.size,
                            weight: accessories?.weight,
                            category: accessories?.category,
                          })
                        )
                      }
                      some={some}
                    />
                  </div>
                  <div>
                    <TechSpecs
                      techSpecs={
                        accessories?.techSpecs.length > 4
                          ? accessories?.techSpecs.slice(0, 4)
                          : accessories?.techSpecs
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.aboutAndTechSpecsWrapper}>
              <div className={styles.aboutSection}>
                <h3 className={styles.aboutHeader}>About</h3>
                {accessories.about.map((item, index) => {
                  return (
                    <ProductAbout
                      key={index}
                      title={item.title}
                      text={item.text}
                    />
                  );
                })}
              </div>
              <div className={styles.techSpecsSection}>
                <h3 className={styles.techSpecsHeader}>Tech specs</h3>
                <TechSpecs techSpecs={accessories.techSpecs} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

SingleAccessoriesPage.propTypes = {};

export default SingleAccessoriesPage;
