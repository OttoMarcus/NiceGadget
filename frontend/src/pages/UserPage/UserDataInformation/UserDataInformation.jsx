import React, { useEffect, useState } from "react";
import styles from "../UserDataInformation/UserDataInformation.module.scss";
import { Form, Formik } from "formik";
import validationSchema from "./validationSchema";
import ModalStatusInfo from "../../../Components/Profile/ModalStatusInfo/ModalStatusInfo";
import CheckMarkIcon from "../../../Components/Icons/CheckMarkIcon";
import ButtonProfile from "../../../Components/Profile/ButtonProfile/ButtonProfile";
import { sendAuthorizedRequest } from "../../../helpers/sendRequest";
import { useDispatch, useSelector } from "react-redux";
import stylesBack from "../../CartPage/CartPage.module.scss";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../store/user/userSlice";
import CrossErrorIcon from "../../../Components/Icons/CrossErrorIcon";
import CustomInput from "../../../Components/Forms/CustomInput/CustomInput";

const UserDataInformation = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resultMessage, setResultMessage] = useState(false);

  const handleBack = () => {
    const prevPath = sessionStorage.getItem("prevPath") || "/";
    if (
      prevPath === "/cart" ||
      prevPath === "/login" ||
      prevPath === "/registration"
    ) {
      navigate("/");
    } else {
      navigate(prevPath);
    }
  };

  const handleSubmit = async (values) => {
    try {
      // const [firstName, lastName] = values.username.split(" ");
      const requestBody = {
        firstName: values.firstName,
        lastName: values.lastName,
        login: values.login,
        email: values.email,
        telephone: values.phoneNumber,
        birthDate: values.birthday,
      };

      await sendAuthorizedRequest(`/api/customers`, "PUT", {
        body: JSON.stringify(requestBody),
      });

      dispatch(updateUser(requestBody));
      setResultMessage(true);
    } catch (error) {
      setResultMessage(false);
      return (
        <>
          <ModalStatusInfo
            text="Oops, Internal error!"
            colorText="#FF0000"
            svgIcon={<CrossErrorIcon />}
          />
        </>
      );
    }
  };

  useEffect(() => {
    const handleRedirect = () => {
      navigate("/user");
    };

    if (resultMessage) {
      const timer = setTimeout(() => {
        handleRedirect();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [resultMessage, navigate]);

  return (
    <section className={styles.container}>
      <div className={stylesBack.backBtnWrapper} onClick={handleBack}>
        <LeftArrowIcon />
        <span className={stylesBack.backBtn}>Back</span>
      </div>
      <div className={styles.sectionDataUser}>
        <div className={styles.sectionTitle}>
          <h2 className={styles.dataTitle}>Edit Profile Information</h2>
        </div>
        <Formik
          initialValues={{
            login: user?.login || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phoneNumber: user?.telephone || "",
            birthday: user?.birthDate || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
              .then(() => {
                setSubmitting(false);
                setResultMessage(true);
              })
              .catch(() => {
                setSubmitting(false);
                setResultMessage(false);
              });
          }}
          enableReinitialize={true}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form
              className={styles.infoDataForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(values).then((r) => (
                  <ModalStatusInfo
                    text="Information successfully updated"
                    colorText="#2FC72FF2"
                    circleShowHide="2px"
                    svgIcon={<CheckMarkIcon />}
                  />
                ));
              }}
            >
              {resultMessage ? (
                <ModalStatusInfo
                  text="Information successfully updated"
                  colorText="#2FC72FF2"
                  circleShowHide="2px"
                  svgIcon={<CheckMarkIcon />}
                />
              ) : (
                <span></span>
              )}
              <CustomInput
                className={styles.dataInput}
                name="firstName"
                placeholder="First name"
                label="Your first name"
                error={
                  errors.firstName && touched.firstName
                    ? errors.firstName
                    : undefined
                }
                onChange={handleChange}
              />
              <CustomInput
                className={styles.dataInput}
                name="lastName"
                placeholder="Last name"
                label="Your last name"
                error={
                  errors.lastName && touched.lastName
                    ? errors.lastName
                    : undefined
                }
                onChange={handleChange}
              />
              <CustomInput
                className={styles.dataInput}
                name="login"
                placeholder="Login"
                label="Your Login"
                error={errors.login && touched.login ? errors.login : undefined}
                onChange={handleChange}
              />
              <CustomInput
                className={styles.dataInput}
                name="email"
                placeholder="example@gmail.com"
                label="Your Email"
                error={errors.email && touched.email ? errors.email : undefined}
                onChange={handleChange}
              />
              <CustomInput
                className={styles.dataInput}
                type="tel"
                name="phoneNumber"
                placeholder="+380"
                label="Your phone number"
                error={
                  errors.phoneNumber && touched.phoneNumber
                    ? errors.phoneNumber
                    : undefined
                }
                onChange={handleChange}
              />
              <CustomInput
                className={styles.dataInput}
                type="date"
                name="birthday"
                label="Your birthday"
                error={
                  errors.birthday && touched.birthday
                    ? errors.birthday
                    : undefined
                }
                onChange={handleChange}
              />
              <div className={styles.updateDataBtnBlock}>
                <ButtonProfile
                  type="submit"
                  text="Update information"
                  className={styles.updateDataBtn}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default UserDataInformation;
