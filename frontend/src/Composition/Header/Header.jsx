import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/user/userSlice";

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
  const [currentPath, setCurrentPath] = useState("");
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  // const [isAuthorized, setIsAuthorized] = useState(false);

  const active = null;

  // const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // const loggedInUser = useSelector((state) => state.user.user);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  // const isUserLoggedIn = Object?.keys(loggedInUser).length === 0 ? false : true;
  // console.log(isUserLoggedIn);

  useEffect(() => {
    if (
      location.pathname !== "/registration" &&
      location.pathname !== "/login"
    ) {
      setCurrentPath(location.pathname);
    }
  }, [location.pathname]);

  const logOutUser = () => {
    console.log("logOutUser success!");
    dispatch(removeUser());
    localStorage.removeItem("token");
    // navigate("/login");
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
                  // handleAuthorized();
                  toggleBurgerActive();
                  logOutUser();
                }}
                className={styles.authChild}
                to="/"
              >
                <LogOut />
              </Link>
            ) : (
              <Link
                onClick={sessionStorage.setItem("prevPath", currentPath)}
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
                <Link onClick={logOutUser} className={styles.mainLinks} to="/">
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
                onClick={sessionStorage.setItem("prevPath", currentPath)}
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
