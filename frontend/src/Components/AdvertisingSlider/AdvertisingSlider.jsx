import React, { useEffect, useState } from "react";
import axios from "axios";

function AdvertisingSlider() {
  const [sliders, setSliders] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/advertising-sliders")
      .then((response) => {
        setSliders(response.data.data);
      })
      .catch((error) => {
        console.error("There was a problem with fetch:", error);
      });
  }, []);

  return (
    <div className="slider-container">
      {sliders?.length > 0 ? (
        sliders.map((slider) => (
          <div key={slider.id} className="slider-item">
            <h2>{slider.title}</h2>
            <p>{slider.subtitle}</p>
            <div className="pictures-container">
              {slider.pictures.map((picture) => (
                <img key={picture.alt} src={picture.link} alt={picture.alt} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AdvertisingSlider;
