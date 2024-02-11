import React from 'react';
import Style from './Main.module.scss'
import Card from '../CardComp/Card'


const Main = () => {
    return (
        <main className={Style.main}>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </main>
    );
};

export default Main;
