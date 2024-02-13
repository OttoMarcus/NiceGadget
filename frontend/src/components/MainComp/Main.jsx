import React from 'react';
import Style from './Main.module.scss'
import Card from '../CardComp/Card'
import SimpleSlider from "../Slider/Slider";



const Main = () => {
    return (
        <main className={Style.mainWrapper} >
            <div className={Style.mainTittleWrapper}>
            <h3 className={Style.mainTittle}>Welcome to Nice Gadgets store!</h3>
            </div>
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
