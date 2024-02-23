import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Style from "./SingleProduct.module.scss";

const SingleProduct = () => {
  const { productId } = useParams();
  console.log(productId);

  const location = useLocation();
  const pathname = location.pathname;

  const queryParams = new URLSearchParams(location.search);
  const [color, setColor] = useState(queryParams.get("color"));
  const [capacity, setCapacity] = useState(queryParams.get("capacity"));
  console.log(color);

  const [model, setModel] = useState();
  console.log(model);

  useEffect(() => {
    fetch(`http://localhost:4000/api/mobile-models/${productId}/`)
      .then((response) => {
        console.log("THEEEEEEEEEN");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("THEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEN", data);
        setModel(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [pathname]);

  return (
    <>
      <div className={Style.testBox}>
        <h1 className={Style.tittle}>This is SingleProduct Page </h1>
        <Link className={Style.linksBtn} to="/">
          Home
        </Link>
      </div>
      {model && (
        <div className={Style.container}>
          <h2>{model?.name}</h2>
          <div className={Style.content}>
            <div className={`${Style.contentProduct} ${Style.imagesWrapper}`}>
              <div className={Style.fiveImagesWrapper}>
                {model?.colors
                  .find((byColor) => byColor.colorName === color)
                  .pictures.map((pic, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={`${pic.link}`}
                          alt={`${pic.alt}`}
                          width={80}
                          height={80}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className={Style.bigPicture}>
                <img
                  src={`${model?.colors.find((byColor) => byColor.colorName === color).pictures[0].link}`}
                  alt={`${model?.colors.find((byColor) => byColor.colorName === color).pictures[0].link}`}
                />
              </div>
            </div>
            <div className={Style.contentProduct}>2</div>
            <div className={Style.contentProduct}>3</div>
            <div className={Style.contentProduct}>4</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
