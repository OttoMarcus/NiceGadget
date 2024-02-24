import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Style from "./SingleProduct.module.scss";
import ColorCircle from "../../ColorCircle/ColorCircle";
import SelectableImageGallery from "../../SelectableImageGallery/SelectableImageGallery";

const SingleProduct = () => {
  const { productId } = useParams();

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

  const handleCapacityClick = (capacity) => setCapacity(capacity);
  const handleColorClick = (color) => setColor(color);

  useEffect(() => {
    fetch(`http://localhost:4000/api/${typeModel}-models/${productId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setModel(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [pathname, productId, typeModel]);

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
            <SelectableImageGallery images={byColor.pictures} />
            <div className={Style.contentProduct}>
              <h3 className={Style.colorsTitle}>Available colors</h3>
              <div className={Style.availableColors}>
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
                    />
                  );
                })}
              </div>
              <div className={Style.capacities}>
                <Link
                  to={`${pathname}?color=${color}&capacity=${128}`}
                  onClick={() => handleCapacityClick("128")}
                >
                  <div
                    className={`${capacity === "128" ? Style.capacityActive : Style.capacitiesItem}`}
                  >
                    128 GB
                  </div>
                </Link>
                <Link
                  to={`${pathname}?color=${color}&capacity=${256}`}
                  onClick={() => handleCapacityClick("256")}
                >
                  <div
                    className={`${capacity === "256" ? Style.capacityActive : Style.capacitiesItem}`}
                  >
                    256 GB
                  </div>
                </Link>
                <Link
                  to={`${pathname}?color=${color}&capacity=${512}`}
                  onClick={() => handleCapacityClick("512")}
                >
                  <div
                    className={`${capacity === "512" ? Style.capacityActive : Style.capacitiesItem}`}
                  >
                    512 GB
                  </div>
                </Link>
              </div>
            </div>
            <div className={Style.contentProduct}>3</div>
            <div className={Style.contentProduct}>4</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
