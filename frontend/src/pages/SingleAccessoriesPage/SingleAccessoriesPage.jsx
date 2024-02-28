import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./SingleAccessoriesPage.module.scss";
import SelectableImageGallery from "../../Components/SelectableImageGallery/SelectableImageGallery";

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
      <div className={styles.testBox}>
        <h2 className={styles.tittle}>This is SingleProductPage </h2>
        <Link className={styles.linksBtn} to="/">
          Home
        </Link>
      </div>

      <div>
        {accessories && (
          <div>
            <h2>{accessories.name}</h2>
            <SelectableImageGallery images={accessories.pictures} />
            <ul>
              {accessories.techSpecs.map((spec, index) => (
                <li key={index}>
                  <strong>{spec.specName}:</strong> {spec.specDescription}
                </li>
              ))}
            </ul>
            <ul>
              {accessories.about &&
                accessories.about.map((info, index) => (
                  <li key={index}>
                    <strong>{info.title}:</strong> {info.text}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

SingleAccessoriesPage.propTypes = {};

export default SingleAccessoriesPage;
