import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AdminOption.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOption } from "../../../store/admin/adminSlice";
import LeftArrowIcon from "../../../Components/Icons/ArrowOpen";
import { findComponentByTitleAndLabel } from "../findComponentByTitleAndLabel";

const AdminOption = ({ optionTitle, subOptions }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // Відстеження відкритих підопцій
  const selectedOption = useSelector((state) => state.admin.selectedOption);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const setOption = (optTitle, optLabel) =>
    dispatch(
      setSelectedOption({
        title: optTitle,
        label: optLabel,
      })
    );

  return (
    <div className={styles.adminOptionWrapper}>
      <div className={styles.titleWrapper} onClick={toggleOpen}>
        <LeftArrowIcon
          isOpenSubOptions={isOpen}
          optionToggled={styles.optionToggled}
        />
        <p className={`${styles.optionTitle}`}>{optionTitle}</p>
      </div>
      <ul
        className={`${styles.supOptionsWrapper} ${isOpen ? "" : styles.supOptionsWrapperHidden}`}
      >
        {subOptions?.map((opt, index) => {
          return (
            <React.Fragment key={index}>
              <li
                className={`${opt.label === selectedOption.label && optionTitle === selectedOption.title ? styles.selectedOption : ""} ${styles.subOption}`}
                onClick={() => {
                  setOption(optionTitle, opt.label);
                }}
              >
                {opt.label}
              </li>
              {isOpen && opt.label === selectedOption.label && (
                <li className={styles.optionContent}>
                  {findComponentByTitleAndLabel(optionTitle, opt.label)}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

AdminOption.propTypes = {
  optionTitle: PropTypes.string.isRequired,
  subOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default AdminOption;
