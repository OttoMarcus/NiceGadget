import React from "react";
import Style from "./Footer.module.scss";
import UpArrow from "../../Components/Icons/UpArrow";

const Footer = () => {
  return (
    <footer className={Style.rectangleFooter}>
      <ul>
        <li>
          <p>Github</p>
        </li>
        <li>
          <p>Contacts</p>
        </li>
        <li>
          <p>Right</p>
        </li>
      </ul>
      <div className={Style.footerUpArrow}>
        <p>Back to top</p>
        <UpArrow />
      </div>
    </footer>
  );
};

export default Footer;
