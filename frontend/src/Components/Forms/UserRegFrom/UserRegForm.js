import React from "react";
import { Formik, Form } from "formik";
import validationSchema from "./validationSchema.js";
import Input from "../CustomInput.js";

const UserRegForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    login: "",
    password: "",
    // birthdate: null,
    // gender: null,
  };

  // S

  const createNewUser = async (userData) => {
    const response = await fetch(`http://localhost:4000/api/customers`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(userData), // body data type must match "Content-Type" header
    });
    return await response.json();
  };

  const onSubmit = (values, actions) => {
    console.log(values);
    createNewUser(values);
    // handleFormSubmit()
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // onSubmit={() => {
      //   console.log('submit success!');
      //   onSubmit()
      // } }
      validationSchema={validationSchema}
    >
      {({ isValid }) => {
        return (
          <Form>
            <h2>Registration Form</h2>
            <Input type="text" name="firstName" placeholder="First name" />
            <Input type="text" name="lastName" placeholder="Last name" />
            <Input
              type="tel"
              name="telephone"
              placeholder="+38(0XX)-XXX-XX-XX"
            />
            <Input type="email" name="email" placeholder="Email" />
            {/* pattern=".+@example\.com" size="30" */}
            <Input type="text" name="login" placeholder="Login" />
            <Input type="password" name="password" placeholder="Password" />
            {/* <Input type="date" name="Birth date" /> */}
            {/* min="1924-12-31" max="2008-01-01" */}
            {/* <input type="radio" name="male" value='male' checked/>
            <input type="radio" name="female" value='female'/> */}

            <button type="submit" disabled={!isValid}>
              {/* disabled={!isValid} */}
              {/* onClick={console.log('checkout clicked!')}  */}
              Sign up
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserRegForm;
