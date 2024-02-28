import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AccessoriesImageGallery.module.scss";

const AccessoriesImageGallery = ({ images }) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // Ensure images is defined and is an array before proceeding
  if (!images || !Array.isArray(images) || images.length === 0) {
    return <div>No images available</div>;
  }

  const handleSelectedImg = (imgIndex) => setSelectedImgIndex(imgIndex);

  return (
    <div className={styles.selectableGallery}>
      <div className={styles.smallImagesWrapper}>
        {images.map((pic, index) => (
          <div
            className={`${styles.smallImgWrapper} ${index === selectedImgIndex ? styles.selectedImg : ""}`}
            key={index}
            onClick={() => handleSelectedImg(index)}
          >
            <img src={pic.link} alt={pic.alt} />
          </div>
        ))}
      </div>
      <div className={styles.bigImgWrapper}>
        {images[selectedImgIndex] && (
          <img
            src={images[selectedImgIndex].link}
            alt={images[selectedImgIndex].alt}
          />
        )}
      </div>
    </div>
  );
};

AccessoriesImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AccessoriesImageGallery;
