import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FAQchat.module.scss";
import Image from "./Image/background.png";
import Instagram from "./Image/instagram.png";
import Telegram from "./Image/telegram.png";
import Gmail from "./Image/gmail.png";
import Facebook from "./Image/facebook.png";

const FAQchat = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    // Получение данных FAQ с сервера
    axios
      .get("http://localhost:4000/api/faq")
      .then((response) => {
        setFaqData(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных FAQ:", error);
      });
  }, []);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <div className={styles.chatWrapper}>
      <img className={styles.backImg} src={Image} alt="back" />
      {faqData.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <div
            className={styles.faqQuestion}
            onClick={() => handleQuestionClick(index)}
          >
            {item.title}
          </div>
          <div
            className={`${styles.faqAnswer} ${selectedQuestion === index ? styles.visible : ""}`}
          >
            <ul>
              {item.subtitle &&
                item.subtitle.advantages &&
                item.subtitle.advantages.map((advantage, advantageIndex) => (
                  <li key={advantageIndex}>{advantage}</li>
                ))}
            </ul>
          </div>
        </div>
      ))}
      <div className={styles.conctactbtn}>
        <div>
          <img src={Telegram} alt="telegram" />
        </div>
        <div>
          <img src={Instagram} alt="instagram" />
        </div>
        <div>
          <img src={Facebook} alt="instagram" />
        </div>
        <div>
          <img src={Gmail} alt="instagram" />
        </div>
      </div>
    </div>
  );
};

export default FAQchat;
