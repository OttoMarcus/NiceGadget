import React from "react";
import styles from "./Footer.module.scss";
import UpArrow from "../../Components/Icons/UpArrow";
import Logo from "../../Components/Icons/Logo";
import Ok from "../../Components/Icons/Ok";
import scrollUp from "../../helpers/scrollUp";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.rectangleFooter} ${styles.container}`}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles.ok}>
            <Ok />
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
            <UpArrow />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
