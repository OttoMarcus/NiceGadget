import React, { useEffect, useState } from "react";
import Style from "./ProductPage.module.scss";
import Photo from "./iphone 13 front.png";
import Favorite from "../Icons/Favorite";

const ProductPage = () => {

  let [productModel, setProductModel] = useState();
  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(({ data }) => {
        console.log(data);
        setProductModel(data[0])
      })
      .catch(err => {
        console.error('Error during fetch operation:', err);
      });
  }, []);
  console.log(productModel);
  return (
    productModel && <>
      <div className={Style.textWrapper}>
        <h2 className={Style.mainTittle}>{productModel.id}</h2>
      </div>
      <div className={Style.mainWrapper}>

        <div className={Style.photo}>
          <div className={Style.miniPhotoWrapper}>
            <div className={Style.photoMini}>
              <img src={Photo} alt="Alt text 1" />
            </div>
            <div className={Style.photoMini}>
              <img src={Photo} alt="Alt text 1" />
            </div>
            <div className={Style.photoMini}>
              <img src={Photo} alt="Alt text 1" />
            </div>
            <div className={Style.photoMini}>
              <img src={Photo} alt="Alt text 1" />
            </div>
            <div className={Style.photoMini}>
              <img src={Photo} alt="Alt text 1" />
            </div>
            <div className={Style.text}>

            </div>
          </div>
          <div className={Style.mainPhoto}>
            <img src={Photo} alt="Alt text 1" />
          </div>
        </div>
        <div className={Style.secondWrapper}>
          <div className={Style.color}>
            <div className={Style.subTittle}>
              <h2 className={Style.h2}>Select capacity</h2>
            </div>
            <div className={Style.colorWrapper}>
              {/*<button style={{ backgroundColor: productModel.variations.blue.hexColor }}></button>*/}
              <button style={{
                width: "20px",
                height: "20px",
                background: productModel.variations.blue.hexColor,
                borderRadius: "50%",
                marginRight: "5px",
                border: "2px solid #ccc"
              }}></button>
              <button className={Style.color2}></button>
              <button className={Style.color3}></button>
              <button className={Style.color4}></button>
            </div>
          </div>
          <div className={Style.btnWrapper}>
            <div className={Style.subTittle}>
              <h2 className={Style.h2}>Select capacity</h2>
            </div>
            <div className={Style.capacityWrapper}>
              <button className={Style.capacity}>64 GB</button>
              <button className={Style.capacity}>128 GB</button>
              <button className={Style.capacity}>256 GB</button>
            </div>
          </div>
          <div className={Style.tittleWrapper}>
            <h4 className={Style.h4}>iPhone 13 64GB</h4>
            <h3 className={Style.h3}>$799</h3>
          </div>


          <div className={Style.button_wrapper}>
            <button className={Style.button}>Add to cart</button>
          </div>

          <div className={Style.aboutWrapper}>
            <div className={Style.second_text}>
              <p className={Style.text1}>Screen: </p>
              <p className={Style.text2}>6.1"</p>
            </div>
            <div className={Style.second_text}>
              <p className={Style.text1}>Capacity: </p>
              <p className={Style.text2}>64 GB</p>
            </div>
            <div className={Style.second_text}>
              <p className={Style.text1}>RAM: </p>
              <p className={Style.text2}>6 GB</p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default ProductPage;