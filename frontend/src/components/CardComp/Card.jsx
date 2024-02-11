import React from 'react';
import Favorite from "../Icons/Favorite";
import Style from './Card.module.scss'
import PhonePic from './image 2.png'

const Card = () => {
    return (
        <div className={Style.card}>
            <div>
                <img src={PhonePic} alt="pic"/>
            </div>
            <div>
                <h4 className={Style.h4}>Apple iPhone 14 Pro 128GB Silver (MQ023)</h4>
                <h3 className={Style.h3}>$999</h3>
            </div>
            <div>
                <div className={Style.second_text}>
                    <p className={Style.text1}>Screen: </p>
                    <p className={Style.text2}>6.1"</p>
                </div>
                <div className={Style.second_text}>
                    <p className={Style.text1}>Capacity: </p>
                    <p className={Style.text2}>128GB</p>
                </div>
                <div className={Style.second_text}>
                    <p className={Style.text1}>RAM: </p>
                    <p className={Style.text2}>6GB</p>
                </div>

            </div>
            <div className={Style.button_wrapper}>
                <button className={Style.button}>Add to cart</button>
                <a className={Style.favorite} href="#"> <Favorite/></a>
            </div>
        </div>
    );
};

export default Card;
