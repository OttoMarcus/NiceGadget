import React from "react";
import styles from "./Footer.module.scss";
import UpArrowIcon from "../../Components/Icons/UpArrowIcon";
import Logo from "../../Components/Icons/Logo";
import OkIcon from "../../Components/Icons/OkIcon";
import scrollUp from "../../helpers/scrollUp";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.rectangleFooter} ${styles.container}`}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles.ok}>
            <OkIcon />
          </div>
        </div>
        <ul className={styles.policy}>
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
        <div className={styles.backTop}>
          <p>Back to top</p>
          <div onClick={scrollUp} className={styles.arrow}>
            <UpArrowIcon />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
