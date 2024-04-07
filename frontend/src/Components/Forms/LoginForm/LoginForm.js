import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import validationSchema from "./validationSchema.js";
import Input from "../CustomInput/CustomInput.js";
import Button from "../../Button/Button.jsx";
import styles from "./LoginForm.module.scss";
import { addUser } from "../../../store/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  synchronizeCartWithServer,
  fetchCartItems,
} from "../../../API/cartAPI.js";
import { synchronizeFavor } from "../../../store/favorites/favoriteSlice.js";
import { orderGetNew, SetOrder } from "../../../store/orders/OrderNew";

const LoginForm = () => {
  const [regStatus, setRegStatus] = useState("");
  const [regError, setRegError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setRegStatus("");
    setRegError("");
  }, []);

  const onAuthRedirect = () => {
    if (localStorage.getItem("token")) {
      const prevPath = sessionStorage.getItem("prevPath");

      if (prevPath) {
        navigate(prevPath);
      } else {
        navigate("/");
      }
    }
  };

  const initialValues = {
    loginOrEmail: "",
    password: "",
  };

  const loginUser = async (userCredentials) => {
    try {
      const response = await fetch(`/api/customers/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      }).then((res) => {
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

      return response.token;
    } catch (error) {
      // setRegStatus("failed")
      // setRegError(error)
      console.error(error.message);
    }
  };

  const getUserOnLogin = async (token) => {
    try {
      const user = await fetch(`/api/customers/customer`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to get user info");
        }
      });

      dispatch(addUser(user));
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (values, actions) => {
    setRegStatus("");
    setRegError("");

    const userCredentials = {
      loginOrEmail: values.loginOrEmail,
      password: values.password,
    };

    const token = await loginUser(userCredentials);
    if (token) {
      await getUserOnLogin(token);
      dispatch(synchronizeCartWithServer());
      dispatch(fetchCartItems());
      dispatch(synchronizeFavor());
      // dispatch(synchronizeOrder());
      dispatch(orderGetNew());
      // dispatch(fetchTodos());
      localStorage.removeItem("orders");
      SetOrder([]);
    } else {
      return;
    }
    onAuthRedirect();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid }) => {
        return (
          <Form className={styles.loginForm}>
            <h1 className={styles.formHeader}>Login Form</h1>
            <Input
              type="text"
              name="loginOrEmail"
              label="Login or Email"
              placeholder="Enter you login or email"
            />
            {/* <Input type="email" name="email" label="Email" placeholder="Email" />
            <Input type="text" name="login" label="Login" placeholder="Login" /> */}
            <Input
              type="password"
              name="password"
              label="Password"
              maxlength="20"
              placeholder="Password"
            />
            <div className={styles.submitContainer}>
              {/* <button type="submit" disabled={!isValid} className={styles.submitBtn}>
                Log In
              </button> */}
              <div className={styles.btnWrapper}>
                <Button type="submit" disabled={!isValid}>
                  Log In
                </Button>
              </div>
              <p className={styles.alternateAction}>
                <span className={styles.or}>or </span>
                <Link to="/registration" className={styles.registerLink}>
                  Register
                </Link>
              </p>
            </div>
            {/* <button type="submit" disabled={!isValid}>
              Log In
            </button>
            <Link to="/registration">Register</Link> */}
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

export default LoginForm;
