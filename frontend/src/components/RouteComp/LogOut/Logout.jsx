import React from 'react';
import {Link} from "react-router-dom";
import Style from "./Logout.module.scss";

const Logout = () => {
    return (
        <div className={Style.testBox}>
            <h1 className={Style.tittle}>This is Logout Page </h1>
            <Link className={Style.linksBtn} to="/">Home</Link>
        </div>
    );
};

export default Logout;