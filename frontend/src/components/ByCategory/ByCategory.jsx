import React from 'react';
import Style from './ByCategory.module.scss'
import PhotoCat1 from './imageCat1.png'
import PhotoCat2 from './imageCat2.png'
import PhotoCat3 from './imageCat3.png'

const ByCategories = () => {
    return (
        <div className={Style.cardCat}>
            <p className={Style.tittle}>Shop by category</p>
            <div className={Style.wrapper}>
                <div className={Style.item}>
                    <img className={Style.pic1} src={PhotoCat1} alt="photo"/>
                    <div>
                        <p className={Style.text1}>Mobile phones</p>
                        <p className={Style.text2}>95 models</p>
                    </div>
                </div>
                <div className={Style.item}>
                    <img className={Style.pic2} src={PhotoCat2} alt="photo"/>
                    <div>
                        <p className={Style.text1}>Tablets</p>
                        <p className={Style.text2}>24 models</p>
                    </div>
                </div>
                <div className={Style.item}>
                    <img className={Style.pic3} src={PhotoCat3} alt="photo"/>
                    <div>
                        <p className={Style.text1}>Accessories</p>
                        <p className={Style.text2}>100 models</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ByCategories;
