import React from 'react';
import {Link} from "react-router-dom";
import Style from "./Tablets.module.scss";

const Tablets = () => {
    return (
        <div className={Style.testBox}>
            <h1 className={Style.tittle}>This is Tablets Page </h1>
            <Link className={Style.linksBtn} to="/">Home</Link>
        </div>
    );
};

export default Tablets;