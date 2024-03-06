import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "../../Components/Icons/LogOut";
import LogIn from "../../Components/Icons/LogIn";
import Favorite from "../../Components/Icons/Heart";
import Cart from "../../Components/Icons/Cart";
import Logo from "../../Components/Icons/Logo";
import Ok from "../../Components/Icons/Ok";
import scrollUp from "../../helpers/scrollUp";

import style from "./Header.module.scss";

const Header = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const active = null;
  const toggleBurgerActive = () => {
    if (window.innerWidth >= 320 && window.innerWidth < 640) {
      setIsBurgerActive(!isBurgerActive);
      isBurgerActive
        ? (document.body.style.overflow = "auto")
        : (document.body.style.overflow = "hidden");
    }
  };

  const hideMenuOnLogoClick = () => {
    if (isBurgerActive) {
      toggleBurgerActive();
      scrollUp();
    } else {
      scrollUp();
    }
  };

  return (
    <header>
      <div className={style.headerBody}>
        <Link onClick={hideMenuOnLogoClick} to="/" className={style.headerLogo}>
          <Logo />
          <div className={style.ok}>
            <Ok />
          </div>
        </Link>

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
              <Favorite some={false} />
            </Link>
            <Link className={style.mainLinks} to="/cart">
              <Cart />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
