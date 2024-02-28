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
      <Link className={styles.linksBtn} to="/">
        Home
      </Link>

      <div>
        {accessories && (
          <div>
            <h2>{accessories.name}</h2>
            <SelectableImageGallery images={accessories.pictures} />
            <div className={styles.paramWrapperContainer}>
              <div className={styles.paramWrapper}>
                {accessories.about &&
                  accessories.about.map((info, index) => (
                    <div className={styles.paramsGroupFirst} key={index}>
                      <p className={styles.title}>{info.title}</p>
                      <p className={styles.description}>{info.text}</p>
                    </div>
                  ))}
              </div>
              <div className={styles.paramContainer}>
                <div className={styles.paramWrapper}>
                  {accessories.techSpecs.map((spec, index) => (
                    <div className={styles.paramsGroup} key={index}>
                      <p className={styles.title}>{spec.specName}</p>
                      <p className={styles.description}>
                        {spec.specDescription}
                      </p>
                    </div>
                  ))}
                </div>
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
