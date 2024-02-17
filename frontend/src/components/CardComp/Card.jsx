import React from 'react';
import Favorite from "../Icons/Favorite";
import Style from './Card.module.scss'


const Card = ({imageSrc , model , price , screen, capacity , ram}) => {
    return (
        <div className={Style.card}>
            <div>
                <img className={Style.cardImg} src={imageSrc} alt="pic"/>
            </div>
            <div>
                <h4 className={Style.h4}>{model}</h4>
                <h3 className={Style.h3}>${price}</h3>
            </div>
            <div className={Style.span}> &nbsp;</div>
            <div>
                <div className={Style.second_text}>
                    <p className={Style.text1}>Screen: </p>
                    <p className={Style.text2}>{screen}</p>
                </div>
                <div className={Style.second_text}>
                    <p className={Style.text1}>Capacity: </p>
                    <p className={Style.text2}>{capacity}</p>
                </div>
                <div className={Style.second_text}>
                    <p className={Style.text1}>RAM: </p>
                    <p className={Style.text2}>{ram}</p>
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
