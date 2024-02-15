import React from 'react';
import {Link} from "react-router-dom";
import Style from "./Phones.module.scss";

const Phones = () => {
    return (
        <div className={Style.testBox}>
            <h1 className={Style.tittle}>This is Phones Page </h1>
            <Link className={Style.linksBtn} to="/">Home</Link>
        </div>
    );
};

export default Phones;
