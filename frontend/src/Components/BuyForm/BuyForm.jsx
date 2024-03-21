import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./BuyForm.module.scss";
import Cash from "./icons/cash.png";
import Visa from "./icons/visa.png";
import Paypal from "./icons/paypal.png";
import MasterCard from "./icons/mastercard.png";

const initialValues = {
  fullName: "",
  address: "",
  mobilePhone: "",
  deliveryMethod: "",
  paymentMethod: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = "Full Name is required";
  }
  if (!values.address) {
    errors.address = "Address is required";
  }
  if (!values.mobilePhone) {
    errors.mobilePhone = "Mobile Phone is required";
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

const BuyForm = () => {
  const handleSubmit = async () => {
    // Handle form submission
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.form}>
          <h2 className={styles.buyTittle}>Last step to buy</h2>
          <div className={styles.labelWrapper}>
            <label htmlFor="fullName" className={styles.labelTitle}>
              Full Name
            </label>
            <Field type="text" name="fullName" className={styles.inputField} />
            <ErrorMessage
              name="fullName"
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
            <label htmlFor="mobilePhone" className={styles.labelTitle}>
              Mobile Phone
            </label>
            <Field
              type="text"
              name="mobilePhone"
              className={styles.inputField}
            />
            <ErrorMessage
              name="mobilePhone"
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
          <Link to="/" className={styles.buttonSubmit}>
            Place Order
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default BuyForm;
