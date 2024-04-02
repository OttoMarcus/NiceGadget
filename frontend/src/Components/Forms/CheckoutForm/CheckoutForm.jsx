import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./CheckoutForm.module.scss";
import Cash from "./icons/cash.png";
import Visa from "./icons/visa.png";
import Paypal from "./icons/paypal.png";
import MasterCard from "./icons/mastercard.png";
import Button from "../../Button/Button";
import {
  deleteCartServer,
  updateProductQuantities,
} from "../../../API/cartAPI";
import { deleteCartLocal } from "../../../store/cart/cartSlice";

const initialValues = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  deliveryMethod: "",
  paymentMethod: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "First Name is required";
  }
  if (!values.lastName) {
    errors.lastName = "Last Name is required";
  }
  if (!values.address) {
    errors.address = "Address is required";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone Number is required";
  }
  if (!values.deliveryMethod) {
    errors.deliveryMethod = "Delivery Method is required";
  }
  if (!values.paymentMethod) {
    errors.paymentMethod = "Payment Method is required";
  }
  return errors;
};

const deliveryOptions = [
  { label: "OnePost", value: "delivery1" },
  { label: "FedEx", value: "delivery2" },
  { label: "Amazon", value: "delivery3" },
];

const paymentOptions = [
  { name: "Visa", icon: Visa },
  { name: "Mastercard", icon: MasterCard },
  { name: "Paypal", icon: Paypal },
  { name: "Cash", icon: Cash },
];

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleSubmit = async (values, { setSubmitting }) => {
    if (isAuthorized) {
      dispatch(updateProductQuantities(cartItems));
      dispatch(deleteCartServer());
    } else {
      dispatch(updateProductQuantities(cartItems));
      dispatch(deleteCartLocal());
    }

    navigate("/");
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form className={styles.form}>
          <h2 className={styles.buyTittle}>Last step to buy</h2>
          <div className={styles.labelWrapper}>
            <label htmlFor="firstName" className={styles.labelTitle}>
              First Name
            </label>
            <Field type="text" name="firstName" className={styles.inputField} />
            <ErrorMessage
              name="firstName"
              component="div"
              className={styles.errorMsg}
            />
          </div>

          <div className={styles.labelWrapper}>
            <label htmlFor="lastName" className={styles.labelTitle}>
              Last Name
            </label>
            <Field type="text" name="lastName" className={styles.inputField} />
            <ErrorMessage
              name="lastName"
              component="div"
              className={styles.errorMsg}
            />
          </div>

          <div className={styles.labelWrapper}>
            <label htmlFor="address" className={styles.labelTitle}>
              Address
            </label>
            <Field type="text" name="address" className={styles.inputField} />
            <ErrorMessage
              name="address"
              component="div"
              className={styles.errorMsg}
            />
          </div>

          <div className={styles.labelWrapper}>
            <label htmlFor="phoneNumber" className={styles.labelTitle}>
              Phone Number
            </label>
            <Field
              type="text"
              name="phoneNumber"
              className={styles.inputField}
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className={styles.errorMsg}
            />
          </div>

          <div className={styles.labelWrapper}>
            <label htmlFor="deliveryMethod" className={styles.labelTitle}>
              Delivery Method
            </label>
            <Field
              as="select"
              name="deliveryMethod"
              className={styles.inputField}
            >
              <option value="" className={styles.options}>
                Select a delivery method
              </option>
              {deliveryOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className={styles.options}
                >
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="deliveryMethod"
              component="div"
              className={styles.errorMsg}
            />
          </div>

          <div className={styles.labelWrapper}>
            <label className={styles.labelTitle}>Payment Method</label>
            <div role="group" className={styles.group}>
              {paymentOptions.map((option) => (
                <label key={option.name} className={styles.radioLabel}>
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value={option.name}
                  />
                  <img
                    src={option.icon}
                    alt={option.name}
                    className={styles.icon}
                  />
                  {option.name}
                </label>
              ))}
            </div>
            <ErrorMessage name="paymentMethod" component="div" />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length !== 0}
          >
            Place Order
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
