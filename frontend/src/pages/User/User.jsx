import React, { useEffect, useState } from "react";
import styles from "./User.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../Components/Profile/CustomInput/Input";
import { Form, Formik } from "formik";
import validationSchema from "../../Components/Forms/UserRegFrom/validationSchema";
import { sendAuthorizedRequest } from "../../helpers/sendRequest";
import ButtonProfile from "../../Components/Profile/ButtonProfile/ButtonProfile";
import { ReactComponent as UserIcon } from "./UserImg/profile-user.svg";
import { ReactComponent as ChangePass } from "./UserImg/change-password-icon.svg";
import UpArrow from "../../Components/Icons/UpArrow";
import RightArrow from "../../Components/Icons/RightArrow";

const User = () => {
  const { user } = useSelector((state) => state.user);
  const [resultMessage, setResultMessage] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isArrowTurnDownVisible, setIsArrowTurnDownVisible] = useState(true);

  useEffect(() => {
    const storedIsArrowTurnDownVisible = JSON.parse(
      localStorage.getItem("isArrowTurnDownVisible")
    );
    if (storedIsArrowTurnDownVisible !== null) {
      setIsArrowTurnDownVisible(storedIsArrowTurnDownVisible);
    }
  }, []);

  const toggleSection = () => {
    setIsOpen(!isOpen);
    setIsArrowTurnDownVisible(!isOpen);
  };

  const handleSubmit = (values, { resetForm }) => {
    const [firstName, lastName] = values.username.split(" ");
    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      login: values.login,
      email: values.email,
      telephone: values.phoneNumber,
      country: values.country,
      homeAddress: values.homeAddress,
    };

    sendAuthorizedRequest(`http://localhost:4000/api/customers`, "PUT", {
      body: JSON.stringify(requestBody),
    }).then((r) => {
      setResultMessage(true);
    });
  };

  return (
    <section className={styles.container}>
      <div className={styles.sectionSubtitle}>
        <UserIcon />
        <h2 className={styles.registration__sectionTitle}>
          Welcome, {user?.firstName}!
        </h2>
      </div>
      <div className={styles.sectionUser}>
        <div className={styles.sectionDataUser}>
          <h3
            className={styles.registration__sectionSubtitle}
            onClick={toggleSection}
          >
            User profile information
            {isArrowTurnDownVisible ? <UpArrow /> : <RightArrow />}
          </h3>
          {isOpen && (
            <Formik
              initialValues={{
                login: user?.login || "",
                username: `${user?.firstName} ${user?.lastName}` || "",
                email: user?.email || "",
                phoneNumber: user?.telephone || "",
                country: user?.country || "",
                homeAddress: user?.homeAddress || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ errors, touched, handleChange, handleSubmit }) => (
                <Form
                  className={styles.registration__form}
                  onSubmit={handleSubmit}
                >
                  {resultMessage ? (
                    <p className={styles.login__registrationError}>
                      Information successfully updated
                    </p>
                  ) : (
                    <span></span>
                  )}
                  <Input
                    className={styles.registration__sectionInput}
                    name="username"
                    placeholder="First and last name"
                    label="Your full name"
                    error={errors.username && touched.username}
                  />
                  <Input
                    className={styles.registration__sectionInput}
                    name="login"
                    placeholder="Login"
                    label="Your login"
                    error={errors.login && touched.login}
                  />
                  <Input
                    className={styles.registration__sectionInput}
                    name="email"
                    placeholder="example@gmail.com"
                    label="Your Email"
                    error={errors.email && touched.email}
                  />
                  <Input
                    className={styles.registration__sectionInput}
                    name="phoneNumber"
                    placeholder="+380"
                    label="Your phone number"
                    error={errors.phone && touched.phone}
                  />
                  <Input
                    className={styles.registration__sectionInput}
                    name="country"
                    placeholder="Ukraine"
                    label="Your country"
                  />
                  <Input
                    className={styles.registration__sectionInput}
                    name="homeAddress"
                    placeholder="Kyiv, Bandery street, 1"
                    label="Your home address"
                  />
                  <div className={styles.login__sectionBtn}>
                    <ButtonProfile
                      type="submit"
                      text="Update information"
                      className={styles.section__btnCheckout}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
        <div className={styles.login__registrationSection}>
          <Link
            to="/update-password"
            className={styles.login__registrationTitle}
          >
            Change password&nbsp;
            <ChangePass className={styles.changePassIcon} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default User;
