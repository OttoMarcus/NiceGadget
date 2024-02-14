import React from 'react';
import Cart from "../Icons/Cart";
import Favorite from "../Icons/Favorite";
import Style from './Header.module.scss'
import Logo from "../Icons/Logo";
import Order from "../Icons/Order";
import LogOut from "../Icons/LogOut";
import LogIn from "../Icons/LogIn";

const Header = () => {
    return (
        <header >
         <div className={Style.headerLogo}>  <a href={`#`}><Logo /></a>
            <ul>
                <li className={Style.headerList}><a  className={Style.linksHeader} href={`#`}>Home</a></li>
                <li className={Style.headerList}><a  className={Style.linksHeader} href={`#`}>Phones</a></li>
                <li className={Style.headerList}><a  className={Style.linksHeader} href={`#`}>Tablets</a></li>
                <li className={Style.headerList}><a  className={Style.linksHeader} href={`#`}>Accessories</a></li>
            </ul>
         </div>
            <div className={Style.btnGroup}>
                <a className={Style.mainLinks} href={`#`}> <LogIn/></a>
                <a className={Style.mainLinks} href={`#`}> <LogOut/></a>
                <a className={Style.mainLinks} href={`#`}> <Order/></a>
                <a className={Style.mainLinks} href={`#`}><Favorite/></a>
                <a className={Style.mainLinks} href={`#`}> <Cart/></a>
            </div>


        </header>
    );
};

export default Header;
