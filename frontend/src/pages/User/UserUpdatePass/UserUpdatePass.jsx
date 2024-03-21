import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import validationSchema from "../UserUpdatePass/validationSchema";
import { sendAuthorizedRequest } from "../../../helpers/sendRequest";
import InputWithStrength from "../../../Components/Profile/InputWithStrength/InputWithStrength";
import { useDispatch, useSelector } from "react-redux";
import ButtonProfile from "../../../Components/Profile/ButtonProfile/ButtonProfile";
import styles from "./UserUpdatePass.module.scss";
import Input from "../../../Components/Profile/CustomInput/Input";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../../store/user/userSlice";
import ModalStatusInfo from "../../../Components/Profile/ModalStatusInfo/ModalStatusInfo";
import CheckMarkIcon from "../../../Components/Icons/CheckMarkIcon";
import CrossErrorIcon from "../../../Components/Icons/CrossErrorIcon";
import stylesBack from "../../CartPage/CartPage.module.scss";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";

const UserUpdatePass = () => {
  const [err, setErr] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const [valuesToSubmit, setValuesToSubmit] = useState(null);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (values.newPassword !== values.newPasswordConfirm) {
      setErr("New password and confirmation do not match");
      return;
    }
    setValuesToSubmit(values);
  };

  useEffect(() => {
    if (valuesToSubmit) {
      const requestBody = {
        userId: user._id,
        password: valuesToSubmit.password,
        newPassword: valuesToSubmit.newPassword,
      };
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
          return (
            <>
              <ModalStatusInfo
                text="Oops, Internal error!"
                colorText="#FF0000"
                svgIcon={<CrossErrorIcon />}
              />
              {setErr(true)};{setSuccessfulMessage(false)};
            </>
          );
        });
    }
  }, [valuesToSubmit, user]);

  useEffect(() => {
    const handleLogoutAndRedirect = () => {
      dispatch(removeUser());
      localStorage.removeItem("token");
      sessionStorage.removeItem("prevPath");
      navigate("/login");
    };

    if (successfulMessage) {
      const timer = setTimeout(() => {
        handleLogoutAndRedirect();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successfulMessage, dispatch, navigate]);

  return (
    <section className={styles.container}>
      <div className={stylesBack.backBtnWrapper} onClick={handleBack}>
        <LeftArrowIcon />
        <span className={stylesBack.backBtn}>Back</span>
      </div>
      <div className={styles.changePassContainer}>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            newPasswordConfirm: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form
              className={styles.updatePassForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(values);
              }}
            >
              <div className={styles.sectionTitle}>
                <h2 className={styles.dataTitle}>Updating your password</h2>
              </div>
              <Input
                name="password"
                className={styles.dataInput}
                type="password"
                placeholder="Your password"
                label="Enter your old password"
                value={values.password}
              />
              {err ? (
                <p className={styles.diffPassError}>
                  Your old password is different
                </p>
              ) : (
                <span></span>
              )}
              <InputWithStrength
                name="newPassword"
                className={styles.dataInput}
                placeholder="New password"
                label="Enter your new password"
                value={values.newPassword}
                handleChange={handleChange}
                error={errors.newPassword && touched.newPassword}
              />
              <InputWithStrength
                name="newPasswordConfirm"
                className={styles.dataInput}
                placeholder="Confirm new password"
                label="Confirm your new password"
                value={values.newPasswordConfirm}
                handleChange={handleChange}
                error={errors.newPasswordConfirm && touched.newPasswordConfirm}
              />
              {err && <p className={styles.diffPassError}>{err}</p>}
              {successfulMessage ? (
                <ModalStatusInfo
                  text="Your password successfully changed"
                  colorText="#2FC72FF2"
                  circleShowHide="2px"
                  svgIcon={<CheckMarkIcon />}
                />
              ) : (
                <span></span>
              )}
              <div className={styles.updateDataBtnBlock}>
                <ButtonProfile
                  type="submit"
                  text="Update password"
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

export default UserUpdatePass;
