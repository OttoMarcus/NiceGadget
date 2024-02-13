import React from 'react';
import Style from './Main.module.scss'
import Card from '../CardComp/Card'
import SimpleSlider from "../Slider/Slider";
import FirstBanner from "../Banner/FirstBanner/FirstBanner";
import SecondBanner from "../Banner/SecondBanner/SecondBanner";


const Main = () => {
    return (
        <main className={Style.mainWrapper} >
            <SimpleSlider/>
            <div className={Style.main}>

                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </main>
    );
};

export default Main;
