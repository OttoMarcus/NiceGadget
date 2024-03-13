import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import validationSchema from "./validationSchema.js";
import Input from "../CustomInput.js";
import Button from "../../Button/Button.jsx";
import styles from "./UserRegForm.module.scss";
import { addUser } from "../../../store/user/userSlice.js";
import { useDispatch } from "react-redux";
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
        return await response.json();
      } else {
        setRegStatus("failed");
        const failReason = await response.json();
        console.log(failReason);
        setRegError(failReason.message);

        return failReason;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

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
      );
      const result = await response.json();
      localStorage.setItem("token", result.token);
      console.log(result.token);

      return result.token;
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
    console.log(user);
    dispatch(addUser(user));
    return user;
  };

  const onAuthRedirect = () => {
    const prevPath = sessionStorage.getItem("prevPath");

    if (prevPath) {
      navigate(prevPath);
    } else {
      navigate("/");
    }
  };

  const onSubmit = async (values, actions) => {
    setRegStatus("");
    setRegError("");
    console.log(values);
    const userCredentials = {
      loginOrEmail: values.login,
      password: values.password,
    };
    const result = await createNewUser(values);
    console.log(result);
    console.log(userCredentials);

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
            <h1>Registration Form</h1>
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
            <div>
              <p>Gender</p>
              <Input
                type="radio"
                name="gender"
                label="Male"
                value="male"
                className={styles.customInput}
              />
              <Input type="radio" name="gender" label="Female" value="female" />
            </div>
            <div className={styles.submitContainer}>
              {/* <button type="submit" disabled={!isValid} className={styles.submitBtn}>
                Register
              </button> */}
              <Button
                // children="Register"
                disabled={!isValid}
              />
              <p>
                or go to <Link to="/login">Log In</Link>
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
