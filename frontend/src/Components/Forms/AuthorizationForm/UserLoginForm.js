import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import validationSchema from "./validationSchema.js";
import Input from "../CustomInput.js";
import styles from "./UserLoginForm.module.scss";
import { addUser } from "../../../store/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  const [regStatus, setRegStatus] = useState("");
  const [regError, setRegError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setRegStatus("");
    setRegError("");
    // setCredentials({})
  }, []);

  const onAuthRedirect = () => {
    const prevPath = sessionStorage.getItem("prevPath");
    console.log(prevPath);
    if (prevPath) {
      navigate(prevPath);
    } else {
      navigate("/");
    }
  };

  const initialValues = {
    loginOrEmail: "",
    password: "",
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

  const onSubmit = async (values, actions) => {
    setRegStatus("");
    setRegError("");
    console.log(values);
    const userCredentials = {
      loginOrEmail: values.loginOrEmail,
      password: values.password,
    };

    console.log(userCredentials);

    const token = await loginUser(userCredentials);
    await getUserOnLogin(token);
    onAuthRedirect();
    // navigate(-1)
    // return user
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid }) => {
        return (
          <Form>
            <h2>Login Form</h2>
            <Input
              type="text"
              name="loginOrEmail"
              label="Login or email"
              placeholder="Enter you login or email"
            />
            {/* <Input type="email" name="email" label="Email" placeholder="Email" />
            <Input type="text" name="login" label="Login" placeholder="Login" /> */}
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
            />
            <button type="submit" disabled={!isValid}>
              Sign up
            </button>
            <Link to="/registration">LogIn</Link>
            {regStatus === "failed" && (
              <p className={styles.submitStatus}>Login {regStatus}!</p>
            )}
            {regError && <p className={styles.submitError}>{regError}</p>}
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserLoginForm;
