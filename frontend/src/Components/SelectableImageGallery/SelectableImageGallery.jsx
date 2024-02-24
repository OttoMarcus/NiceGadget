import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SelectableImageGallery.module.scss";

const SelectableImageGallery = ({ images }) => {
  const [selectedImgIndex, setSelectedImg] = useState(0);

  const handleSelectedImg = (imgIndex) => setSelectedImg(imgIndex);

  return (
    <div className={styles.selectableGallery}>
      <div className={styles.smallImagesWrapper}>
        {images.map((pic, index) => {
          return (
            <div
              className={`${styles.smallImgWrapper} ${index === selectedImgIndex ? styles.selectedImg : ""}`}
              key={index}
              onClick={() => handleSelectedImg(index)}
            >
              <img
                src={`${pic.link}`}
                alt={`${pic.alt}`}
                // width={80}
                // height={80}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.bigImgWrapper}>
        <img
          src={`${images[selectedImgIndex].link}`}
          alt={`${images[selectedImgIndex].alt}`}
          // height={442}
          // width={442}
        />
      </div>
    </div>
  );
};

SelectableImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SelectableImageGallery;
