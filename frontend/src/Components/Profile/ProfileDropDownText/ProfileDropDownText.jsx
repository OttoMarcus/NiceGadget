import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";

const ProfileDropDownText = ({ heading, content }) => {
  const [isActive, setActive] = useState(false);

  const toggleText = () => {
    setActive(!isActive);
  };

  return (
    <>
      <li>
        <h2 onClick={toggleText}>{heading}</h2>

        {isActive && content}
        <button type="button" onClick={toggleText} className="dropDown__plus">
          {!isActive ? <>+</> : <>-</>}
        </button>
      </li>
    </>
  );
};

ProfileDropDownText.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ProfileDropDownText;
