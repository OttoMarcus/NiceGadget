import React from 'react';
import Style from './ProductPage.module.scss'
import Photo from './iphone 13 front.png'
import Favorite from "../Icons/Favorite";

const ProductPage = () => {
    return (
        <>
            <div className={Style.textWrapper}>
            <h2 className={Style.mainTittle}>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</h2>
            </div>
            <div className={Style.mainWrapper}>

                <div className={Style.photo}>
                    <div className={Style.miniPhotoWrapper}>
                        <div className={Style.photoMini}>
                            <img src={Photo} alt="Alt text 1"/>
                        </div>
                        <div className={Style.photoMini}>
                            <img src={Photo} alt="Alt text 1"/>
                        </div>
                        <div className={Style.photoMini}>
                            <img src={Photo} alt="Alt text 1"/>
                        </div>
                        <div className={Style.photoMini}>
                            <img src={Photo} alt="Alt text 1"/>
                        </div>
                        <div className={Style.photoMini}>
                            <img src={Photo} alt="Alt text 1"/>
                        </div>
                        <div className={Style.text}>

                        </div>
                    </div>
                    <div className={Style.mainPhoto}>
                        <img src={Photo} alt="Alt text 1"/>
                    </div>
                </div>
                <div className={Style.secondWrapper}>
                    <div className={Style.color}>
                        <div className={Style.subTittle}>
                            <h2 className={Style.h2}>Select capacity</h2>
                        </div>
                        <div className={Style.colorWrapper}>
                            <button className={Style.color1}></button>
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
                        <a className={Style.favorite} href="#"> <Favorite/></a>
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