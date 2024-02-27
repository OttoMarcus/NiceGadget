import React from "react";
import Style from "./AccessoriesPage.module.scss";

const AccessoriesPage = () => {
  return (
    <div>
      <section className={Style.container}>
        <h1>Accessories</h1>
        <div className={Style.cardWrapper}>{/*<AccessoriesCard />*/}</div>
      </section>
    </div>
  );
};

export default AccessoriesPage;
