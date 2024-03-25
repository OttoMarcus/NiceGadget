import React, { useEffect, useState } from "react";
import Twitter from "../../Components/Icons/Twitter";
import Facebook from "../../Components/Icons/Facebook";
import Instagram from "../../Components/Icons/Instagram";

import styles from "./Contacts.module.scss";

const Contacts = () => {
  const [activeTab, setActiveTab] = useState();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setActiveTab("kyiv");
  }, []);

  const handleTabClick = (addressId) => {
    setActiveTab(addressId);
  };

  const handleHovered = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.backgroundImg}></div>
      <h1 className={`${styles.contactTitle} ${styles.container}`}>
        Contact Us
      </h1>
      <ul className={`${styles.contactsWrapper} ${styles.container}`}>
        <li className={`${styles.contactItem} ${styles.hour}`}>
          <h3 className={styles.address}>Address</h3>
          <ul className={styles.cityTitle}>
            <li
              onClick={() => handleTabClick("kyiv")}
              className={`${styles.city} ${activeTab === "kyiv" && styles.activeCity}`}
              data-address-id="kyiv"
            >
              Kyiv
            </li>

            <li
              onClick={() => handleTabClick("lviv")}
              className={`${styles.city} ${activeTab === "lviv" && styles.activeCity}`}
              data-address-id="lviv"
            >
              Lviv
            </li>

            <li
              onClick={() => handleTabClick("kharkiv")}
              className={`${styles.city} ${activeTab === "kharkiv" && styles.activeCity}`}
              data-address-id="kharkiv"
            >
              Kharkiv
            </li>
          </ul>

          <div className={styles.addressWrap}>
            <div
              id="kyiv"
              className={`${styles.addressId} ${activeTab === "kyiv" && styles.activeAddress}`}
            >
              <b>Maidan Nezalezhnosti, 1</b>
              <p>ZIP, 02000</p>
              <div className={styles.hours}>
                <p>Hours:</p>
                <ul className={styles.columns}>
                  <li>Monday 10 AM–10 PM</li>
                  <li>Tuesday 10 AM–10 PM</li>
                  <li>Wednesday 10 AM–10 PM</li>
                  <li>Thursday 10 AM–10 PM</li>
                  <li>Friday 10 AM–10 PM</li>
                  <li>Saturday 10 AM–10 PM</li>
                  <li>Sunday 10 AM–10 PM</li>
                </ul>
              </div>
            </div>

            <div
              id="lviv"
              className={`${styles.addressId} ${activeTab === "lviv" && styles.activeAddress}`}
            >
              <b>Soborna Square, 14</b>
              <p>ZIP, 79000</p>
              <div className={styles.hours}>
                <p>Hours:</p>
                <ul className={styles.columns}>
                  <li>Monday 10 AM– 8 PM</li>
                  <li>Tuesday 10 AM– 8 PM</li>
                  <li>Wednesday 10 AM– 8 PM</li>
                  <li>Thursday 10 AM– 8 PM</li>
                  <li>Friday 10 AM– 8 PM</li>
                  <li>Saturday 10 AM– 8 PM</li>
                  <li>Sunday 10 AM– 8 PM</li>
                </ul>
              </div>
            </div>

            <div
              id="kharkiv"
              className={`${styles.addressId} ${activeTab === "kharkiv" && styles.activeAddress}`}
            >
              <b>Hryhoriia Skovorody, 2а</b>
              <p>ZIP, 61000</p>
              <div className={styles.hours}>
                <p>Hours:</p>
                <ul className={styles.columns}>
                  <li>Monday 10 AM–9 PM</li>
                  <li>Tuesday 10 AM–9 PM</li>
                  <li>Wednesday 10 AM–9 PM</li>
                  <li>Thursday 10 AM–9 PM</li>
                  <li>Friday 10 AM–9 PM</li>
                  <li>Saturday 10 AM–9 PM</li>
                  <li>Sunday 10 AM–9 PM</li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <li className={`${styles.contactItem} ${styles.map}`}>
          {/*<LocatorPage />*/}
        </li>
      </ul>
      <ul className={`${styles.socialWrapper} ${styles.container}`}>
        <li className={styles.connection}>
          <p>Support:</p>
          <a href="mailto:nicegadgets.support@tune.com">
            <p className={styles.connectionItem}>
              nicegadgets.support@tune.com
            </p>
          </a>
        </li>
        <li className={styles.connection}>
          <p>Phones:</p>
          <p
            onMouseOver={handleHovered}
            className={
              isHovered
                ? `${styles.connectionItem} ${styles.rotateOnHover}`
                : styles.connectionItem
            }
          >
            (044) 371 1137
          </p>
        </li>

        <li className={styles.connection}>
          <h3 className={styles.connection}>FOLLOW US ON SOCIAL MEDIA</h3>

          <div
            className={`${styles.socialIcon} ${styles.twitterIcon}`}
            title="Twitter"
          >
            <div className={styles.socialIconBloom}></div>
            <div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
            </div>
            <Twitter />
          </div>

          <div
            className={`${styles.socialIcon} ${styles.facebookIcon}`}
            title="Facebook"
          >
            <div className={styles.socialIconBloom}></div>
            <div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
            </div>
            <Facebook />
          </div>

          <div
            className={`${styles.socialIcon} ${styles.instagramIcon}`}
            title="Instagram"
          >
            <div className={styles.socialIconBloom}></div>
            <div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
              <div className={styles.socialIconSparkleLine}></div>
            </div>
            <Instagram />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Contacts;
