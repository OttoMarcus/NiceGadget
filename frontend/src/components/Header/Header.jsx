import React from "react";
import Cart from "../icons/Cart";
import Favorite from "../icons/Favorite";
import Style from "./Header.module.scss";
import Logo from "../icons/Logo";
import Order from "../icons/Order";
import LogOut from "../icons/LogOut";
import LogIn from "../icons/LogIn";
import Registration from "../icons/Registration";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className={Style.headerLogo}>
        {" "}
        <a href={`#`}>
          <Logo />
        </a>
        <ul>
          <Link className={Style.linksHeader} to="/">
            Home
          </Link>
          <Link className={Style.linksHeader} to="/products/color=blue">
            Phones
          </Link>
          <Link className={Style.linksHeader} to="/tablets">
            Tablets
          </Link>
          <Link className={Style.linksHeader} to="/accessories">
            Accessories
          </Link>
        </ul>
      </div>
      <div className={Style.btnGroup}>
        <Link className={Style.mainLinks} to="/registration">
          <Registration />
        </Link>
        <Link className={Style.mainLinks} to="/login">
          <LogIn />
        </Link>
        <Link className={Style.mainLinks} to="/logout">
          <LogOut />
        </Link>
        <Link className={Style.mainLinks} to="/order">
          <Order />
        </Link>
        <Link className={Style.mainLinks} to="/favorites">
          <Favorite />
        </Link>
        <Link className={Style.mainLinks} to="/shopingcart">
          <Cart />
        </Link>
      </div>
    </header>
  );
};

export default Header;
