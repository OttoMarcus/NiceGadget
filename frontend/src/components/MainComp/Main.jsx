import React from 'react';
import Style from './Main.module.scss'
import Card from '../CardComp/Card'
import SimpleSlider from "../Slider/AdvSlider/Slider";
import BrandSlider from "../Slider/BrandSlider/BrandSlider";
import Photo1 from '../CardComp/iphone1.png'
import Photo2 from '../CardComp/iphone2.png'
import Photo3 from '../CardComp/iphone3.png'
import Photo4 from '../CardComp/iphone4.png'
import ByCategories from "../ByCategory/ByCategory";




const Main = () => {
    return (
        <main className={Style.mainWrapper} >
            <div className={Style.mainTittleWrapper}>
            <h3 className={Style.mainTittle}>Welcome to Nice Gadgets store!</h3>
            </div>
            <div className={Style.sliderWrapper}>
                <SimpleSlider/>
                <BrandSlider title={"Brand new models"}/>
                <ByCategories/>
                <BrandSlider title={"Hot Prices"}/>
            </div>
            <div className={Style.main}>
                {/*<Card imageSrc={Photo1} model={"Iphone 14 Pro Max 128GB Gold (MX34551)"} capacity={"128GB"} price={799} ram={"6GB"} screen={"6.1"}/>*/}
                {/*<Card imageSrc={Photo2} model={"Iphone 15 Pro 256GB Rose (VF22431)"} capacity={"256GB"} price={899} ram={"6GB"} screen={"5.1"}/>*/}
                {/*<Card imageSrc={Photo3} model={"Iphone 13 64 GB Gray (BG78812)"} capacity={"64GB"} price={699} ram={"4GB"} screen={"5.2"}/>*/}
                {/*<Card imageSrc={Photo4} model={"Iphone 15 Pro 256GB Silver (ST62735)"} capacity={"256GB"} price={849} ram={"6GB"} screen={"6.1"}/>*/}
            </div>
        </main>

    );
};

export default Main;
