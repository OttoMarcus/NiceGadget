import React from 'react';
import Cart from "../Icons/Cart";
import Favorite from "../Icons/Favorite";
import Style from './Header.module.scss'
import Logo from "../Icons/Logo";
import Order from "../Icons/Order";
import LogOut from "../Icons/LogOut";
import LogIn from "../Icons/LogIn";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header >
         <div className={Style.headerLogo}>  <a href={`#`}><Logo /></a>
            <ul>
                <Link className={Style.linksHeader} to="/">Home</Link>
                <Link className={Style.linksHeader} to="/phones">Phones</Link>
                <Link className={Style.linksHeader} to="/tablets">Tablets</Link>
                <Link className={Style.linksHeader} to="/accessories">Accessories</Link>
            </ul>
         </div>
            <div className={Style.btnGroup}>
                <Link className={Style.mainLinks} to="/login"><LogIn/></Link>
                <Link className={Style.mainLinks} to="/logout"><LogOut/></Link>
                <Link className={Style.mainLinks} to="/order"><Order/></Link>
                <Link className={Style.mainLinks} to="/favorites"><Favorite/></Link>
                <Link className={Style.mainLinks} to="/shopingcart"><Cart/></Link>
            </div>


        </header>
    );
};

export default Header;
