import React from 'react';
import Cart from "../Icons/Cart";
import Favorite from "../Icons/Favorite";
import Style from './Header.module.scss'
import Logo from "../Icons/Logo";

const Header = () => {
    return (
        <header >
         <div className={Style.headerLogo}>  <a href={`#`}><Logo /></a>
            <ul>
                <li><a href={`#`}>Home</a></li>
                <li><a href={`#`}>Phones</a></li>
                <li><a href={`#`}>Tablets</a></li>
                <li><a href={`#`}>Accessories</a></li>
            </ul>
         </div>
            <div><a href={`#`}><Favorite/></a> <a href={`#`}> <Cart/></a></div>


        </header>
    );
};

export default Header;
