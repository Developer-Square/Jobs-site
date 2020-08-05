import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  Divider,
  LinkButton,
} from "./SignInOutForm.style";
import {
  Facebook,
  // Google
} from "components/AllSvgIcon";
import { AuthContext } from "contexts/auth/auth.context";
import { TERMS_CONDITIONS } from "constants/routes.constants";
import { closeModal } from "@redq/reuse-modal";
import { Formik, Form } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { addToLocalStorageObject } from "helpers";

export default function SignOutModal() {
  const { state, authDispatch } = useContext(AuthContext);
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
  };

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // /activate/eyJ1c2VybmFtZSI6ImloaWhpaCIsImFjdGlvbiI6ImFjdGl2YXRpb24ifQ:1jcuC4:rCUdGNtqNMaDwxItHCz912bA-qM

    const body = values;
    console.log("body", body);

    axios
      .post(`${BASE_URL}/accounts/register/`, body)
      .then((res) => {
        console.log("data received", res);
        setSubmitting(false);
        addToLocalStorageObject(
          "thedb_auth_profile",
          "email",
          res.data.email.toLowerCase()
        );
        addToLocalStorageObject(
          "thedb_auth_profile",
          "full_name",
          res.data.full_name.toLowerCase()
        );
        addToLocalStorageObject("thedb_auth_profile", "id", res.data.id);
        // hashPassword(values.password_confirm);
        // eslint-disable-next-line no-unused-vars
        let profile = {};
        let email = { email: values.email, secret: values.password };
        profile = { ...res.data, ...email };

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "access_token",
            `${values.email}.${values.password}`
          );
          authDispatch({
            type: "EMAILCONFIRM",
          });
          authDispatch({
            type: "UPDATE",
            payload: {
              ...state,
              profile,
            },
          });

          // closeModal();
        }
        // if ((res.status = 200)) {
        //   dispatch(createMessage({ success: "Registration successful" }));
        // }
        console.log("response", res);
      })
      .catch((err) => {
        authDispatch({ type: "SIGNUP_FAILED" });
        console.log("error", err.response.data);

        setErrors(err.response.data);
        setSubmitting(false);

        return err.response.data;
      });

    return null;
  };

  return (
    <Wrapper>
      <Container>
        <Heading>Sign Up</Heading>

        <SubHeading>Every fill is required in sign up</SubHeading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
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
                  // value={
                  //   formik.values.full_name !== "" && formik.values.email !== ""
                  //     ? formik.setFieldValue(
                  //         formik.values.username,
                  //         formik.values.full_name.split(" ").join("_")
                  //       )
                  //     : formik.setFieldValue(formik.values.username, "")
                  // }
                />

                <HelperText style={{ padding: "20px 0 30px" }}>
                  By signing up, you agree to The Database's{" "}
                  <Link to={TERMS_CONDITIONS} onClick={() => closeModal()}>
                    Terms &amp; Condtions
                  </Link>
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
                <Divider>
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
                />

                <Offer style={{ padding: "20px 0" }}>
                  Already have an account?{" "}
                  <LinkButton onClick={toggleSignInForm}>Login"</LinkButton>
                </Offer>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Wrapper>
  );
}
