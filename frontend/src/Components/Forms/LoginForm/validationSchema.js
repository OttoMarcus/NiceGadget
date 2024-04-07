import { object, string } from "yup";

const validationSchema = object({
  loginOrEmail: string()
    .min(3, "Entered value must be at least 3 characters")
    .max(15, "Entered value must be not more than 15 characters")
    .required("Login or Email is required"),

  password: string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Allowed characters for password are a-z, A-Z, 0-9."
    )
    .min(7, "Password must be between 7 and 20 characters")
    .max(20)
    .required("Password is required"),
});

export default validationSchema;
