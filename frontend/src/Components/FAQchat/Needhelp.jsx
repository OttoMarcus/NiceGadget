import React, { useState } from "react";
import style from "./Needhelp.module.scss";
import FAQchat from "./FAQchat";

const NeedHelp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsIconVisible(!isIconVisible);
  };

  const closeIcon = () => {
    setIsModalOpen(false);
    setIsIconVisible(true);
  };

  return (
    <>
      {isIconVisible && (
        <div className={style.helpIcon}>
          <img
            className={style.support}
            src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375642/Slider/vp21m1icja5nuoxzinl7.webp"
            onClick={toggleModal}
            alt="Support Icon"
          />
          <p className={style.help}>Need Help ?</p>
        </div>
      )}

      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div>
            <img
              src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375515/Slider/cguy3tgdt14tkziuraj9.png"
              className={style.close}
              onClick={closeIcon}
              alt="Close Icon"
            />
            <FAQchat />
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(NeedHelp);
