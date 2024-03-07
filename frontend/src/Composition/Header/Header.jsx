import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Style from "./Header.module.scss";
import LogOut from "../../Components/Icons/LogOut";
import LogIn from "../../Components/Icons/LogIn";
import Registration from "../../Components/Icons/Registration";
import Order from "../../Components/Icons/Order";
import Favorite from "../../Components/Icons/Heart";
import Cart from "../../Components/Icons/Cart";
import { removeUser } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [currentPath, setCurrentPath] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.user);
  const isUserLoggedIn = Object?.keys(loggedInUser).length === 0 ? false : true;
  console.log(isUserLoggedIn);

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
    navigate("/login");
  };

  return (
    <header>
      <p style={{ width: "40px", color: "white", fontSize: "18px" }}>
        {loggedInUser?.login}
      </p>
      <div className={Style.headerLogo}>
        {" "}
        <ul>
          <Link className={Style.linksHeader} to="/">
            Home
          </Link>
          <Link className={Style.linksHeader} to="/phones">
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
        {isUserLoggedIn && <LogOut handleUserLogOut={logOutUser} />}
        <Link className={Style.mainLinks} to="/order">
          <Order />
        </Link>
        <Link className={Style.mainLinks} to="/favorites">
          <Favorite />
        </Link>
        <Link className={Style.mainLinks} to="/shopingcart">
          <Cart />
        </Link>
        {!isUserLoggedIn && (
          <>
            <Link
              className={Style.mainLinks}
              to="/registration"
              onClick={sessionStorage.setItem("prevPath", currentPath)}
            >
              <Registration />
            </Link>
            <Link
              className={Style.mainLinks}
              to="/login"
              onClick={sessionStorage.setItem("prevPath", currentPath)}
            >
              <LogIn />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
