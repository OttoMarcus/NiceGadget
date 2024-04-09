import React from "react";
import PropTypes from "prop-types";

import styles from "./City.module.scss";

const AddressInfo = ({ cityName, address, activeTab }) => {
  // const currentDay = (cityName, activeTab) => {
  //   if (cityName === activeTab) {
  //     const currentDate = new Date();
  //     const options = { weekday: 'long' };
  //     const currentDayName = currentDate.toLocaleDateString('en-US', options);
  //     console.log(currentDayName);
  //   }
  // }

  // currentDay();

  return (
    <div
      id={cityName}
      className={`${styles.addressId} ${activeTab === cityName && styles.activeAddress}`}
    >
      <b>{address.street}</b>
      <p>ZIP, {address.zip}</p>
      <div className={styles.hours}>
        <p>Open Hours:</p>
        <ul>
          {address.hours.map((hour, index) => (
            <li key={index}>{hour}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

AddressInfo.propTypes = {
  cityName: PropTypes.string.isRequired,
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    hours: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  activeTab: PropTypes.string,
};

export default AddressInfo;
