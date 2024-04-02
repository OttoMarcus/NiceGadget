import { object, string } from "yup";

const validationSchema = object({
  firstName: string("First Name must be a string")
    .min(2, "First Name is too short")
    .max(25, "First Name is too long")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "First Name can only contain Latin letters."
    )
    .required("First name is required"),
  lastName: string("Last Name must be a string")
    .min(2, "Last Name is too short")
    .max(25, "Last Name is too long")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Last name can only contain Latin letters."
    )
    .required("Last name is required"),
  phoneNumber: string()
    .matches(
      /^\+380\s?\(?\d{2,3}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
      "Phone number must be in the format +380 (XX) XXX-XX-XX"
    )
    .required("Phone number is required"),
  email: string()
    .email("Email format is invalid")
    .required("Email is required"),
  deliveryAddress: string().required("Delivery Address is required"),
  deliveryMethod: string().required("Delivery Method is required"),
  paymentMethod: string().required("Payment Method is required"),
});

export default validationSchema;
