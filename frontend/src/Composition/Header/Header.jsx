import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "../../Components/Icons/LogOut";
import LogIn from "../../Components/Icons/LogIn";
import Favorite from "../../Components/Icons/Heart";
import Cart from "../../Components/Icons/Cart";
import LogoOk from "../../Components/Icons/Logo+ok";

import style from "./Header.module.scss";

const Header = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const active = null;
  const toggleBurgerActive = () => {
    if (window.innerWidth > 320 && window.innerWidth < 640) {
      setIsBurgerActive(!isBurgerActive);
      isBurgerActive
        ? (document.body.style.overflow = "auto")
        : (document.body.style.overflow = "hidden");
    }
  };

  const hideMenuOnLogoClick = () => {
    if (isBurgerActive) {
      toggleBurgerActive();
    }
  };

  return (
    <header>
      <div className={style.headerBody}>
        <LogoOk hideMe={hideMenuOnLogoClick} />
        <div
          onClick={toggleBurgerActive}
          className={
            !isBurgerActive
              ? style.headerBurger
              : `${style.headerBurger} ${style.activeBurger}`
          }
        >
          <span></span>
        </div>
        <nav
          className={
            !isBurgerActive
              ? style.headerMenu
              : `${style.headerMenu} ${style.activeBurger}`
          }
        >
          <div className={style.headerList}>
            <Link
              onClick={toggleBurgerActive}
              className={`${style.linksHeader} ${active ? style.linkActive : ""}`}
              to="/"
            >
              Home
            </Link>

            <Link
              path="/phones"
              onClick={toggleBurgerActive}
              className={`${style.linksHeader} ${active ? style.linkActive : ""}`}
              to="/phones"
            >
              Phones
            </Link>

            <Link
              path="/tablets"
              onClick={toggleBurgerActive}
              className={`${style.linksHeader} ${active ? style.linkActive : ""}`}
              to="/tablets"
            >
              Tablets
            </Link>

            <Link
              path="/accessories"
              onClick={toggleBurgerActive}
              className={`${style.linksHeader} ${active ? style.linkActive : ""}`}
              to="/accessories"
            >
              Accessories
            </Link>

            <Link
              onClick={toggleBurgerActive}
              className={`${style.linksHeader} ${style.additionalMobileMenu}`}
              to="/registration"
            >
              Registration
            </Link>

            <Link
              onClick={toggleBurgerActive}
              className={`${style.linksHeader} ${style.additionalMobileMenu}`}
              to="/favorires"
            >
              Favorites
            </Link>

            <Link
              onClick={toggleBurgerActive}
              className={`${style.linksHeader} ${style.additionalMobileMenu}`}
              to="/orders"
            >
              Orders
            </Link>

            <Link
              onClick={toggleBurgerActive}
              className={`${style.linksHeader} ${style.additionalMobileMenu}`}
              to="/cart"
            >
              Cart
            </Link>
          </div>

          <div className={style.auth}>
            <Link className={style.authChild} to="/login">
              <LogIn />
            </Link>
            <Link className={style.authChild} to="/logout">
              <LogOut />
            </Link>
          </div>
          <div className={style.btnGroup}>
            <Link className={style.mainLinks} to="/login">
              <LogIn />
            </Link>
            <Link className={style.mainLinks} to="/logout">
              <LogOut />
            </Link>
            <Link className={style.mainLinks} to="/favorites">
              <Favorite />
            </Link>
            <Link className={style.mainLinks} to="/shopingcart">
              <Cart />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
