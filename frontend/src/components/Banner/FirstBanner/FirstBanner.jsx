import React from 'react';
import Style from './FirstBanner.module.scss'

const FirstBanner = () => {
    return (
        <>
            <div className={Style.banner}>
                <p className={Style.mainText}>iPhone 15 Pro</p>
                <div className={Style.bannerBox}>
                    <div className={Style.bannerTittleWrapper}>
                        <p className={Style.bannerTittle}>Pre-order with us !</p>
                        <p className={Style.bannerSlogan}>Be the first</p>
                    </div>
                    <button className={Style.bannerBtn}>Order now</button>
                </div>
            </div>


        </>
    );
};

export default FirstBanner;
