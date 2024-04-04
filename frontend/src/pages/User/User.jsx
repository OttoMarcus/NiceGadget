import React from "react";
import styles from "./User.module.scss";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import UserInfoIcon from "../../Components/Icons/UserInfoIcon";
import UpdatePassIcon from "../../Components/Icons/UpdatePassIcon";
import UserProfileIcon from "../../Components/Icons/UserProfileIcon";
import Input from "../../Components/Profile/CustomInput/Input";
import { Form, Formik } from "formik";
import OrderIcon from "../../Components/Icons/OrderIcon";
import CounterIcon from "../../Components/Icons/CounterIcon";

const User = () => {
  const { user } = useSelector((state) => state.user);
  const order = useSelector((state) => state.OrderNew.orders);
  if (!Object.keys(user).length) {
    return (
      <>
        <div className={styles.container}>
          <section className={styles.unauthorizedWrapper}>
            <h3 className={styles.unauthorizedWrapperTitle}>
              You are not authorized
            </h3>
            <span className={styles.unauthorizedWrapperSubtitle}>
              Please,&nbsp;
              <NavLink to="/login" className={styles.unauthorizedLogin}>
                Login
              </NavLink>{" "}
              or&nbsp;
              <Link to="/registration" className={styles.unauthorizedSignup}>
                Signup
              </Link>{" "}
              to gain access
            </span>
          </section>
        </div>
      </>
    );
  } else {
    return (
      <>
        <section className={styles.container}>
          <div className={styles.userContainer}>
            <div className={styles.sectionAvatar}>
              <div className={styles.avatarIcon}>
                <UserProfileIcon />
              </div>
              <div className={styles.registration__sectionTitle}>
                <p className={styles.registration__sectionTitleText}>
                  WELCOME,
                </p>
                <p className={styles.registration__sectionTitleName}>
                  {user?.firstName}&nbsp;!
                </p>
              </div>
            </div>

            <section className={styles.categoryUsers}>
              <div className={styles.login__registrationSection}>
                <Link
                  style={{ color: "#FFFFFF" }}
                  to="/data-information"
                  className={styles.linkCategoryUsers}
                >
                  Editing profile information
                </Link>
                <UserInfoIcon className={styles.iconForListUser} />
              </div>

              <div className={styles.login__registrationSection}>
                <Link
                  style={{ color: "#FFFFFF" }}
                  to="/update-password"
                  className={styles.linkCategoryUsers}
                >
                  Change password&nbsp;
                </Link>
                <UpdatePassIcon className={styles.iconForListUser} />
              </div>

              <Link
                className={`${styles.login__registrationSection}`}
                to="/orders"
              >
                {/*{className={styles.mainLinks} }*/}
                <div>
                  <h2 className={styles.linkCategoryUsers}>Orders</h2>
                </div>
                <div className={styles.FavorWrapper}>
                  <OrderIcon />
                  <div
                    className={styles.wrapperCount}
                    style={{ display: order.length > 0 ? "flex" : "none" }}
                  >
                    <CounterIcon />
                    <span className={styles.FavorQuantity}>{order.length}</span>
                  </div>
                </div>
              </Link>
            </section>
            <section className={styles.userInfoContainer}>
              <div className={styles.userInformation}>
                <div className={styles.sectionTitle}>
                  <h2 className={styles.dataTitle}>Your profile information</h2>
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
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Form className={styles.infoDataForm}>
                    <Input
                      disabled
                      className={styles.dataInput}
                      name="firstName"
                      placeholder="First name"
                      label="Your First name:"
                    />
                    <Input
                      disabled
                      className={styles.dataInput}
                      name="lastName"
                      placeholder="Last name"
                      label="Your Last name:"
                    />
                    <Input
                      disabled
                      className={styles.dataInput}
                      name="login"
                      placeholder="Login"
                      label="Your Login:"
                    />
                    <Input
                      disabled
                      className={styles.dataInput}
                      name="email"
                      placeholder="example@gmail.com"
                      label="Your Email:"
                    />
                    <Input
                      disabled
                      className={styles.dataInput}
                      name="phoneNumber"
                      placeholder="+380"
                      label="Your phone number:"
                    />
                    <Input
                      disabled
                      className={styles.dataInput}
                      name="birthday"
                      label="Your Birthday:"
                    />
                  </Form>
                </Formik>
              </div>
            </section>
          </div>
        </section>
      </>
    );
  }
};

export default User;
