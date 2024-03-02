import React from "react";
import styles from "./Breadcrumbs.module.scss";
import { Link, useLocation } from "react-router-dom";
import Home from "../../Components/Icons/Home";
import RightArrow from "../../Components/Icons/RightArrow";
import { eachWordFirstLetterToUpperCase } from "../../helpers/capitalizeFirstLettersOfEachWordInSentence";
import { capitalizeFirstLetterOfWord } from "../../helpers/capitalizeFirstLetterOfWord";

const Breadcrumbs = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const queryParams = new URLSearchParams(location.search);

  const handleQueryParams = (params) => {
    let queryParamsString = "";
    params.forEach((value, key) => {
      if (key === "capacity") {
        queryParamsString += `${value} GB`;
      } else {
        if (value.includes(" ")) {
          queryParamsString += `${eachWordFirstLetterToUpperCase(value)} `;
        } else {
          queryParamsString += `${capitalizeFirstLetterOfWord(value)} `;
        }
      }
    });
    return queryParamsString;
  };

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      if (crumb.includes("-")) {
        currentLink += `/${crumb}`;
        crumb = eachWordFirstLetterToUpperCase(crumb, "-");
      }
      if (crumb.includes("%20")) {
        currentLink += `/${crumb}`;
        crumb = eachWordFirstLetterToUpperCase(crumb, "%20");
      } else {
        currentLink += `/${crumb}`;
        crumb = eachWordFirstLetterToUpperCase(crumb);
      }

      if (array.length - 1 === index) {
        return (
          <div key={crumb} className={`${styles.crumb} ${styles.lastCrumb}`}>
            <Link to={currentLink}>
              {crumb}{" "}
              {queryParams.size !== 0 ? handleQueryParams(queryParams) : ""}
            </Link>
          </div>
        );
      } else {
        return (
          <div key={crumb} className={styles.crumb}>
            <Link to={currentLink} className={styles.crumbGap}>
              {crumb}
            </Link>
            <RightArrow />
          </div>
        );
      }
    });

  return (
    <>
      {!isHomePage && (
        <div className={`${styles.breadcrumbs} ${styles.container}`}>
          <div className={styles.crumb}>
            <Link to={"/"} className={styles.crumbGap}>
              <Home />
            </Link>
            <RightArrow />
          </div>
          {crumbs}
        </div>
      )}
    </>
  );
};

export default Breadcrumbs;
