import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import LogOut from "../../Components/Icons/LogOut";
import LogIn from "../../Components/Icons/LogIn";
import Registration from "../../Components/Icons/Registration";
import Order from "../../Components/Icons/Order";
import Favorite from "../../Components/Icons/Heart";
import Cart from "../../Components/Icons/Cart";

const Header = () => {
  return (
    <header>
      {/*<div className={style.headerLogo}>*/}
      {/*  {" "}*/}
      {/*  <ul>*/}
      {/*    <Link className={style.linksHeader} to="/">*/}
      {/*      Home*/}
      {/*    </Link>*/}
      {/*    <Link className={style.linksHeader} to="/phones">*/}
      {/*      Phones*/}
      {/*    </Link>*/}
      {/*    <Link className={style.linksHeader} to="/tablets">*/}
      {/*      Tablets*/}
      {/*    </Link>*/}
      {/*    <Link className={style.linksHeader} to="/accessories">*/}
      {/*      Accessories*/}
      {/*    </Link>*/}
      {/*  </ul>*/}
      {/*</div>*/}

      <div className={style.headerBody}>
        <a href="#" className={style.headerLogo}>
          <img src="" alt="logo" />
        </a>
        <div className={style.headerBurger}>
          <span></span>
        </div>
        <nav className={style.headerMenu}>
          <ul className={style.headerList}>
            <Link className={style.linksHeader} to="/">
              Home
            </Link>
            <Link className={style.linksHeader} to="/phones">
              Phones
            </Link>
            <Link className={style.linksHeader} to="/tablets">
              Tablets
            </Link>
            <Link className={style.linksHeader} to="/accessories">
              Accessories
            </Link>
          </ul>
          <ul className={style.btnGroup}>
            <Link className={style.mainLinks} to="/registration">
              <Registration />
            </Link>
            <Link className={style.mainLinks} to="/login">
              <LogIn />
            </Link>
            <Link className={style.mainLinks} to="/logout">
              <LogOut />
            </Link>
            <Link className={style.mainLinks} to="/order">
              <Order />
            </Link>
            <Link className={style.mainLinks} to="/favorites">
              <Favorite />
            </Link>
            <Link className={style.mainLinks} to="/shopingcart">
              <Cart />
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
