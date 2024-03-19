import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import validationSchema from "./validationSchema.js";
import Input from "../CustomInput.js";
import Button from "../../Button/Button.jsx";
import styles from "./UserRegForm.module.scss";
import { addUser } from "../../../store/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserRegForm = () => {
  const [regStatus, setRegStatus] = useState("");
  const [regError, setRegError] = useState("");
  // const [credentials, setCredentials] = useState({})

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setRegStatus("");
    setRegError("");
    // setCredentials({})
  }, []);
  const user = useSelector((state) => state.user.user);
  const createNewUser = async (userData) => {
    try {
      console.log(userData);
      // setCredentials({loginOrEmail: userData.login, password: userData.password})
      const response = await fetch(`http://localhost:4000/api/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        setRegStatus("successful");
        setTimeout(() => {
          console.log(`user`, user);
        }, 1000);
        return await response.json();
      } else {
        setRegStatus("failed");
        const failReason = await response.json();

        setRegError(failReason.message);

        return failReason;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // const loginUser = async (userCredentials) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/api/customers/login`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(userCredentials),
  //       }
  //     );
  //     const result = await response.json();
  //     localStorage.setItem("token", result.token);
  //     console.log(result.token);

  //     return result.token;
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const loginUser = async (userCredentials) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/customers/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCredentials),
        }
      ).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setRegError("Check your credentials");
          setRegStatus("failed");
          throw new Error("Login failed. Check your credentials");
        }
      });

      // const result = await response.json();
      localStorage.setItem("token", response.token);
      console.log(response.token);

      return response.token;
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserOnLogin = async (token) => {
    const user = await fetch(`http://localhost:4000/api/customers/customer`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }).then((res) => res.json());

    dispatch(addUser(user));
    return user;
  };

  // const onAuthRedirect = () => {
  //   const prevPath = sessionStorage.getItem("prevPath");

  //   if (prevPath) {
  //     navigate(prevPath);
  //   } else {
  //     navigate("/");
  //   }
  // };

  const onAuthRedirect = () => {
    if (localStorage.getItem("token")) {
      const prevPath = sessionStorage.getItem("prevPath");
      console.log(prevPath);
      if (prevPath) {
        navigate(prevPath);
      } else {
        navigate("/");
      }
    }
  };

  const onSubmit = async (values, actions) => {
    setRegStatus("");
    setRegError("");

    const userCredentials = {
      loginOrEmail: values.login,
      password: values.password,
    };

    const result = await createNewUser(values);
    console.log(result);

    const token = await loginUser(userCredentials);
    await getUserOnLogin(token);
    onAuthRedirect();

    // return user
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    login: "",
    password: "",
    gender: "",
    birthDate: "2000-01-01",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid }) => {
        return (
          <Form className={styles.regForm}>
            <h1 className={styles.formHeader}>Registration Form</h1>
            <Input
              type="text"
              name="firstName"
              label="First name"
              placeholder="First name"
            />
            <Input
              type="text"
              name="lastName"
              label="Last name"
              placeholder="Last name"
            />
            <Input
              type="tel"
              name="telephone"
              label="Phone number"
              placeholder="+38(0XX)-XXX-XX-XX"
            />
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
            />
            <Input type="text" name="login" label="Login" placeholder="Login" />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
            />
            <Input type="date" name="birthDate" label="Birth Date" />
            <div className={styles.genderContainer}>
              <p className={styles.genderTitle}>Gender</p>
              <input
                className={styles.genderOption}
                type="radio"
                name="gender"
                value="male"
              />
              <label htmlFor="gender" className={styles.inputLabel}>
                Male
              </label>
              <input
                className={styles.genderOption}
                type="radio"
                name="gender"
                value="female"
              />
              <label htmlFor="gender" className={styles.inputLabel}>
                Female
              </label>
            </div>
            <div className={styles.submitContainer}>
              {/* <button type="submit" disabled={!isValid} className={styles.submitBtn}>
                Register
              </button> */}
              <Button type="submit" disabled={!isValid}>
                Register
              </Button>
              <p className={styles.alternateAction}>
                <span className={styles.or}>or </span>
                <Link className={styles.loginLink} to="/login">
                  LOG IN
                </Link>
              </p>
            </div>
            {regStatus === "failed" && (
              <p className={styles.submitStatus}>Registration {regStatus}!</p>
            )}
            {regError && <p className={styles.submitError}>{regError}</p>}
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserRegForm;
