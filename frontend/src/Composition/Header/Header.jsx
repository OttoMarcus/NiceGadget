import React from "react";
import { Link } from "react-router-dom";
import Style from "./Header.module.scss";
import LogOut from "../../Components/Icons/LogOut";
import LogIn from "../../Components/Icons/LogIn";
import Registration from "../../Components/Icons/Registration";
import Order from "../../Components/Icons/Order";
import Favorite from "../../Components/Icons/Heart";
import Cart from "../../Components/Icons/Cart";

const Header = () => {
  return (
    <header>
      <div className={Style.headerLogo}>
        {" "}
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
