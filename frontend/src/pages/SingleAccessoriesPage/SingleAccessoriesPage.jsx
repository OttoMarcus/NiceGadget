import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AboutCard from "../../Components/AboutCard/AboutCard";
import styles from "./SingleAccessoriesPage.module.scss";
import AccessoriesTechSpecs from "../../Components/AccessoriesTechSpec/AccessoriesTechSpecs";
import SelectableImageGallery from "../../Components/SelectableImageGallery/SelectableImageGallery";
import AccesorriesPriceGroup from "../../Components/AccessoriesPriceGroup/AccesorriesPriceGroup";
import Style from "../AccessoriesPage/AccessoriesPage.module.scss";
import Home from "../../Components/Icons/Home";
import LeftArrow from "../../Components/Icons/LeftArrow";

const SingleAccessoriesPage = () => {
  const { accessoryId } = useParams();
  const [accessories, setAccessories] = useState();

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
      <div className={Style.buttonWrapper}>
        <div className={Style.buttonBack}>
          <Link className={Style.linksBtn} to="/accessories">
            <LeftArrow />
            Back
          </Link>
        </div>
        <div className={Style.buttonHome}>
          <Link className={Style.linksBtn} to="/">
            <Home />
            Home
          </Link>
        </div>
      </div>

      <div>
        {accessories && (
          <div className={styles.container}>
            <div className={styles.title3}>{accessories.name}</div>
            <div className={styles.content}>
              <div className={styles.contentProduct}>
                <SelectableImageGallery images={accessories.pictures} />
              </div>
              <div className={styles.contentProduct}>
                <AccesorriesPriceGroup price={accessories.price} />
              </div>
              <div className={styles.contentProduct}>
                <div className={styles.title}>About</div>
                <AboutCard about={accessories.about} />
              </div>
              <div className={styles.contentProduct}>
                <div className={styles.title2}>Tech Specs</div>
                <AccessoriesTechSpecs specs={accessories.techSpecs} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

SingleAccessoriesPage.propTypes = {};

export default SingleAccessoriesPage;
