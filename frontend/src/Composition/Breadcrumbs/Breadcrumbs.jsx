import React from "react";
import styles from "./Breadcrumbs.module.scss";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../../Components/Icons/HomeIcon";
import RightArrowIcon from "../../Components/Icons/RightArrowIcon";
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
            <Link to={currentLink} className={`${styles.crumbLink}`}>
              {crumb}{" "}
              {queryParams.size !== 0 && array.length !== 1
                ? handleQueryParams(queryParams)
                : ""}
            </Link>
          </div>
        );
      } else {
        return (
          <div key={crumb} className={styles.crumb}>
            <Link
              to={currentLink}
              className={`${styles.crumbLink} ${styles.crumbGap}`}
            >
              {crumb}
            </Link>
            <RightArrowIcon />
          </div>
        );
      }
    });

  return (
    <>
      {!isHomePage && (
        <div className={`${styles.breadcrumbs} ${styles.container}`}>
          <div className={styles.crumb}>
            <Link to={"/"} className={`${styles.crumbLink} ${styles.crumbGap}`}>
              <HomeIcon />
            </Link>
            <RightArrowIcon />
          </div>
          {crumbs}
        </div>
      )}
    </>
  );
};

export default Breadcrumbs;
