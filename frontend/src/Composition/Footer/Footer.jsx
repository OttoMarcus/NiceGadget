import React from "react";
import style from "./Footer.module.scss";
import UpArrow from "../../Components/Icons/UpArrow";
import Logo from "../../Components/Icons/Logo";
import Ok from "../../Components/Icons/Ok";
import scrollUp from "../../helpers/scrollUp";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={`${style.rectangleFooter} ${style.container}`}>
        <div className={style.logo}>
          <Logo />
          <div className={style.ok}>
            <Ok />
          </div>
        </div>
        <ul className={style.policy}>
          <li>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              Github
            </a>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
          <li>
            <Link to="/right">rights</Link>
          </li>
        </ul>
        <div className={style.backTop}>
          <p>Back to top</p>
          <div onClick={scrollUp} className={style.arrow}>
            <UpArrow />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
