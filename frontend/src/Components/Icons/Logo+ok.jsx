import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Ok from "./Ok";
import scrollToTop from "../../helpers/scrollUp";

import style from "../../Composition/Header/Header.module.scss";

const LogoOk = (hideMe) => {
  return (
    <Link
      onClick={() => {
        hideMe();
        scrollToTop();
      }}
      to="/"
      className={style.headerLogo}
    >
      <Logo />
      <div className={style.ok}>
        <Ok />
      </div>
    </Link>
  );
};

export default LogoOk;
