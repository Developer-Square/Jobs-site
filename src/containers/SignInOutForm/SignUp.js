import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import // Facebook,
// Google
"components/AllSvgIcon";
import { AuthContext } from "contexts/auth/auth.context";
import { closeModal } from "@redq/reuse-modal";
import { Formik, Form } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { TOS } from "constants/routes.constants";
import Loader from "components/Loader/Loader";
import Error500 from "components/Error/Error500";

import {
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  // Divider,
  LinkButton,
} from "./SignInOutForm.style";


export default function SignOutModal() {
  const { authDispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setLoading(false);
  }, []);

  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";
  const nameNotLongEnough = "user's name must be at least 4 characters";
  const passwordNotLongEnough = "password must be at least 8 characters";
  const passwordDoNotMatch = "passwords must match";
  const fieldRequired = "This field is required";


  const initialValues = {
    full_name: "",
    email: "",
    username: "",
    password: "",
    password_confirm: "",
    is_individual: "true",
    is_business: "false",
  };
  const options = [
    { key: "Individual", value: true },
    { key: "Company", value: false },
  ];
  const organizationOptions = [
    { key: "Business", value: true },
    { key: "Education", value: false },
  ];
  const YES = { key: "Individual", value: true };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),
    full_name: Yup.string()
      .min(4, nameNotLongEnough)
      .max(100)
      .required(fieldRequired),
    password: Yup.string()
      .min(8, passwordNotLongEnough)
      .matches(/^.*[a-zA-Z].*$/, "Must Contain One Letter")
      .matches(/^.*\d.*$/, "Must Contain One Number")
      .max(100)
      .required(fieldRequired),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], passwordDoNotMatch)
      .required(fieldRequired),
  });

  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };

  const onSubmit = async (values, { props, setErrors, setSubmitting }) => {
    setSubmitting(true);
    const body = values;
    console.log("body", body);

    axios
      .post(`${BASE_URL}/accounts/register/`, body)
      .then(async (res) => {
        console.log("data received", res);
        if (typeof window !== "undefined") {
          authDispatch({
            type: "EMAILCONFIRM",
          });
          // authDispatch({ type: "SIGNUP_SUCCESS" });
          await new Promise((resolve) => setTimeout(resolve, 3000));
          // authDispatch({ type: "SIGNIN" });
          // closeModal();
        }
        setSubmitting(false);
        console.log("response", res);
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data);
          console.log(err.response.data);
        } else {
          setError(err);
        }
        console.log(err);
        setSubmitting(false);
        setLoading(false);
      });

    return null;
  };
  const handleTOS = () => {
    closeModal();
    history.push(`${TOS}`);
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <Wrapper>
      <Container>
        <Heading>Sign Up</Heading>
        {loading ? (
          <Loader />
        ) : (
          <>
            <SubHeading>Every fill is required in sign up</SubHeading>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                const requireBusiness =
                  formik.values.is_individual !== `${YES.value}`;
                return (
                  <Form>
                    <FormikControl
                      control="radio"
                      label="Register as:"
                      name="is_individual"
                      options={options}
                    />
                    {formik.values.is_individual === "true" ? null : (
                      <>
                        {requireBusiness && (
                          <FormikControl
                            control="radio"
                            label="Choose Category"
                            name="is_business"
                            options={organizationOptions}
                          />
                        )}
                      </>
                    )}

                    <FormikControl
                      control="input"
                      type="text"
                      label="Full Name"
                      name="full_name"
                    />
                    <FormikControl
                      control="input"
                      type="email"
                      label="Email"
                      name="email"
                    />
                    <FormikControl
                      control="input"
                      type="password"
                      label="Password"
                      name="password"
                    />
                    <FormikControl
                      control="input"
                      type="password"
                      label="Confirm Password"
                      name="password_confirm"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Username"
                      name="username"
                    />

                    <HelperText style={{ padding: "20px 0 30px" }}>
                      By signing up, you agree to The Database's{" "}
                      <strong style={{ color: "#21277f" }} onClick={handleTOS}>
                        Terms &amp; Condtions
                      </strong>
                    </HelperText>

                    <Button
                      type="submit"
                      disabled={!formik.isValid}
                      fullwidth
                      title={
                        formik.isSubmitting ? "Creating account... " : "Sign Up"
                      }
                      style={{ color: "#ffffff" }}
                    />
                    {/* <Divider>
                  <span>or continue with</span>
                </Divider>

                <Button
                  fullwidth
                  title={"Facebook"}
                  iconPosition="left"
                  className="facebook"
                  icon={<Facebook />}
                  iconStyle={{ color: "#ffffff", marginRight: 5 }}
                  style={{ color: "#ffffff" }}
                /> */}

                    <Offer style={{ padding: "20px 0" }}>
                      Already have an account?{" "}
                      <LinkButton onClick={toggleSignInForm}>Login</LinkButton>
                    </Offer>
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </Container>
    </Wrapper>
  );
}
