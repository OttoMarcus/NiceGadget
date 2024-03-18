import React, { useState } from "react";
import { Form, Formik } from "formik";
import validationSchema from "../../../Components/Forms/UserRegFrom/validationSchema";
import { sendAuthorizedRequest } from "../../../helpers/sendRequest";
import InputWithStrength from "../../../Components/Profile/InputWithStrength/InputWithStrength";
import { useSelector } from "react-redux";
import ButtonProfile from "../../../Components/Profile/ButtonProfile/ButtonProfile";
import Styles from "./UserUpdatePass.module.scss";
import styles from "../User.module.scss";
import Input from "../../../Components/Profile/CustomInput/Input";

const UserUpdatePass = () => {
  const [err, setErr] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (values) => {
    const requestBody = {
      userId: user.id,
      password: values.password,
      newPassword: values.newPassword,
    };
    console.log(requestBody);
    sendAuthorizedRequest(
      `http://localhost:4000/api/customers/password`,
      "PUT",
      {
        body: JSON.stringify(requestBody),
      }
    )
      .then((r) => {
        setSuccessfulMessage(true);
        setErr(false);
      })
      .catch((err) => {
        setErr(true);
        setSuccessfulMessage(false);
      });
  };

  return (
    <div>
      <section className={styles.registrationSection}>
        {/*<div className="breadcrumbs_login">*/}
        {/*  <Breadcrumbs/>*/}
        {/*</div>*/}
        <div className={Styles.change__passContainer}>
          <Formik
            initialValues={{
              password: "",
              newPassword: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, handleChange }) => (
              <Form
                className={styles.registration__form}
                onSubmit={(e) => {
                  e.preventDefault(); // Зупиняємо стандартну дію відправки форми
                  handleSubmit(values); // Викликаємо вашу власну функцію handleSubmit
                }}
              >
                <div className={styles.sectionSubtitle}>
                  <h2 className={styles.registration__sectionSubtitle}>
                    Change your password
                  </h2>
                  {/*<PasswordIcon className="profile-icon" />*/}
                </div>
                <Input
                  name="password"
                  className={styles.registration__sectionInput}
                  type="password"
                  placeholder="password"
                  label="Enter your old password"
                  value={values.password}
                />
                {err ? (
                  <p className={styles.login__registrationError}>
                    Your old password is different
                  </p>
                ) : (
                  <span></span>
                )}
                <InputWithStrength
                  name="newPassword"
                  placeholder="password"
                  label="Enter your new password"
                  handleChange={handleChange}
                  error={errors.newPassword && touched.newPassword}
                />
                <Input
                  name="newPasswordConfirm"
                  className={styles.registration__sectionInput}
                  type="password"
                  placeholder="password"
                  label="Confirm your new password"
                  error={
                    errors.newPasswordConfirm && touched.newPasswordConfirm
                  }
                />
                {successfulMessage ? (
                  <p className={styles.login__registrationError}>
                    Your password successfully changed
                  </p>
                ) : (
                  <span></span>
                )}
                <div className={styles.login__sectionBtn}>
                  <ButtonProfile
                    type="submit"
                    text="Update password"
                    className={styles.section__btnCheckout}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
};

export default UserUpdatePass;
