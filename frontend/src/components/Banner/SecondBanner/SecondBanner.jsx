import React from 'react';
import Style from './SecondBanner.module.scss'

const SecondBanner = () => {
    return (
        <>
            <div className={Style.banner}>
                <p className={Style.mainText}>iPhone 11 Sale Week</p>
                <div className={Style.bannerBox}>
                    <div className={Style.bannerTittleWrapper}>
                        <p className={Style.bannerTittle}>Sale 20%</p>
                        <p className={Style.bannerSlogan}>Save your money</p>
                    </div>
                    <button className={Style.bannerBtn}>Buy now</button>
                </div>
            </div>


        </>
    );
};

export default SecondBanner;