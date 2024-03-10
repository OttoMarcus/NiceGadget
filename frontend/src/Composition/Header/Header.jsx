import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOut from "../../Components/Icons/LogOut";
import User from "../../Components/Icons/User";
import Favorite from "../../Components/Icons/Heart";
import Cart from "../../Components/Icons/Cart";
import Logo from "../../Components/Icons/Logo";
import Ok from "../../Components/Icons/Ok";
import scrollUp from "../../helpers/scrollUp";
import LogIn from "../../Components/Icons/LogIn";

import styles from "./Header.module.scss";
import SearchForm from "../../Components/SearchForm/SearchForm";

const Header = () => {
  const active = null;
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuthorized = () => {
    setIsAuthorized(!isAuthorized);
  };

  const handleAuthUser = (event) => {
    if (isAuthorized) {
      toggleBurgerActive();
    } else {
      event.preventDefault();
    }
  };

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
      <div className={styles.headerBody}>
        <Link
          onClick={hideMenuOnLogoClick}
          to="/"
          className={styles.headerLogo}
        >
          <Logo />
          <div className={styles.ok}>
            <Ok />
          </div>
        </Link>

        <div
          onClick={toggleBurgerActive}
          className={
            !isBurgerActive
              ? styles.headerBurger
              : `${styles.headerBurger} ${styles.activeBurger}`
          }
        >
          <span></span>
        </div>
        <nav
          className={
            !isBurgerActive
              ? styles.headerMenu
              : `${styles.headerMenu} ${styles.activeBurger}`
          }
        >
          <div className={styles.headerList}>
            <Link
              onClick={toggleBurgerActive}
              className={`${styles.linksHeader} ${active ? styles.linkActive : ""}`}
              to="/"
            >
              Home
            </Link>

            <Link
              onClick={toggleBurgerActive}
              className={`${styles.linksHeader} ${active ? styles.linkActive : ""}`}
              to="/phones"
            >
              Phones
            </Link>

            <Link
              onClick={toggleBurgerActive}
              className={`${styles.linksHeader} ${active ? styles.linkActive : ""}`}
              to="/tablets"
            >
              Tablets
            </Link>

            <Link
              onClick={toggleBurgerActive}
              className={`${styles.linksHeader} ${active ? styles.linkActive : ""}`}
              to="/accessories"
            >
              Accessories
            </Link>

            <Link
              onClick={toggleBurgerActive}
              className={`${styles.linksHeader} ${styles.additionalMobileMenu}`}
              to="/favorires"
            >
              Favorites
            </Link>

            <Link
              onClick={toggleBurgerActive}
              className={`${styles.linksHeader} ${styles.additionalMobileMenu}`}
              to="/cart"
            >
              Cart
            </Link>

            <SearchForm />
          </div>

          <div className={styles.auth}>
            <Link
              onClick={handleAuthUser}
              className={styles.authChild}
              to="/user"
            >
              <User fill={isAuthorized ? "white" : "#3b3e4a"} />
            </Link>
            {isAuthorized ? (
              <Link
                onClick={() => {
                  handleAuthorized();
                  toggleBurgerActive();
                }}
                className={styles.authChild}
                to="/"
              >
                <LogOut />
              </Link>
            ) : (
              <Link
                onClick={handleAuthorized}
                className={styles.authChild}
                to="/login"
              >
                <LogIn />
              </Link>
            )}
          </div>
          <div className={styles.btnGroup}>
            {isAuthorized ? (
              <>
                <Link
                  onClick={handleAuthorized}
                  className={styles.mainLinks}
                  to="/"
                >
                  <LogOut />
                </Link>
                <Link
                  onClick={handleAuthUser}
                  className={styles.mainLinks}
                  to="/user"
                >
                  <User />
                </Link>
              </>
            ) : (
              <Link
                onClick={handleAuthorized}
                className={styles.mainLinks}
                to="/login"
              >
                <LogIn />
              </Link>
            )}
            <Link className={styles.mainLinks} to="/favorites">
              <Favorite some={false} />
            </Link>
            <Link className={styles.mainLinks} to="/cart">
              <Cart />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
