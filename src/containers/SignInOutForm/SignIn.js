import React, { useContext, useState, useEffect } from "react";
import {
  LinkButton,
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  // Divider,
} from "./SignInOutForm.style";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import { Facebook, Google } from "components/AllSvgIcon";
import { AuthContext } from "contexts/auth/auth.context";
// import { closeModal } from "@redq/reuse-modal";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";

import {
  unhashPassword,
  addObjectToLocalStorageObject,
  addToLocalStorageArray,
} from "helpers";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import { useHistory } from "react-router-dom";
import { addToLocalStorageObject } from "helpers";
import Error500 from "components/Error/Error500";
import Loader from "components/Loader/Loader";

export default function SignInModal() {
  const history = useHistory();
  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";
  const passwordNotLongEnough = "password must be at least 3 characters";
  const fieldRequired = "This field is required";
  const [initialValues, setInitialValues] = useState();
  const { state, authDispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("thedb_auth_profile") !== null) {
      setInitialValues({
        login: JSON.parse(localStorage.getItem("thedb_auth_profile")).email,
        password: unhashPassword(),
      });
    }
    setInitialValues({
      login: "",
      password: "",
    });
    setLoading(false);
  }, []);

  const toggleSignUpForm = () => {
    authDispatch({
      type: "SIGNUP",
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: "FORGOTPASS",
    });
  };

  const validationSchema = Yup.object({
    login: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),

    password: Yup.string()
      .min(8, passwordNotLongEnough)
      .max(100)
      .required(fieldRequired),
  });

  const onSubmit = (values, { setErrors, setSubmitting }) => {
    setLoading(true);
    const body = values;
    console.log("body", body);
    setTimeout(() => {
      // call the login function
      // setLogin(true);
      // setLoginDetails(values);
      try {
        axios
          .post(`${BASE_URL}/accounts/login/`, body)
          .then(async (res) => {
            console.log("data received", res);
            setSubmitting(false);
            var roles;
            roles = "admin";
            addToLocalStorageArray("thedb_auth_roles", roles);
            // eslint-disable-next-line no-unused-vars

            var payload = {};

            let extraPayloadData = {
              token: res.data.token,
            };
            // hashPassword(values.password_confirm);
            // eslint-disable-next-line no-unused-vars
            payload = { ...payload, ...extraPayloadData };
            addObjectToLocalStorageObject("thedb_auth_payload", payload);

            let auth_profile = res.data;
            addObjectToLocalStorageObject("thedb_auth_profile", auth_profile);
            addToLocalStorageObject(
              "thedb_auth_profile",
              "dummy_verified",
              false
            );

            let profile = {};
            let email = { email: values.email, secret: values.password };
            profile = { ...res.data, ...email };

            if (typeof window !== "undefined") {
              localStorage.setItem("access_token", `${res.data.token}`);
              authDispatch({
                type: "LOGIN_SUCCESS",
              });
              authDispatch({
                type: "UPDATE",
                payload: {
                  ...state,
                  profile,
                },
              });
              await new Promise((resolve) => setTimeout(resolve, 1000));
              history.push("/dashboard");

              // closeModal();
            }
            // CHECK TOKEN & LOAD USER
            axios
              .get(`${BASE_URL}/accounts/profile/`, tokenConfig())
              .then((res) => {
                let auth_profile = res.data;
                addObjectToLocalStorageObject(
                  "thedb_auth_profile",
                  auth_profile
                );
              })
              .catch((err) => {
                if (err.response.data) {
                  setErrors(err.response.data);
                } else {
                  setError(err);
                }
                console.log(err.response.status);
                setSubmitting(false);
                setLoading(false);
              });
            // if ((res.status = 200)) {
            //   dispatch(createMessage({ success: "Registration successful" }));
            // }
            console.log("response", res);
          })
          .catch((err) => {
            if (err.response.data) {
              setErrors(err.response.data);
            } else {
              setError(err);
            }
            console.log(err.response);
            setSubmitting(false);
            setLoading(false);
          });
      } catch (error) {
        console.log("Catching Errors:", error);
        setError(error);
      }
      var payload = {
        username: "hihihfisfihi",
        exp: 1591028890,
        origIat: 1591028590,
        user_id: "VXNlcjo3Mg==",
        is_staff: false,
        is_superuser: false,
      };
      let email = { email: values.email, secret: values.password };
      payload = { ...payload, ...email };
      addObjectToLocalStorageObject("thedb_auth_payload", payload);
    }, 500);
    setSubmitting(false);
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Heading>Welcome Back</Heading>

            <SubHeading>Login with your email &amp; password</SubHeading>
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      type="email"
                      label="Email"
                      name="login"
                    />
                    <FormikControl
                      control="input"
                      type="password"
                      label="Password"
                      name="password"
                    />

                    <Button
                      type="submit"
                      disabled={!formik.isValid}
                      fullwidth
                      title={
                        formik.isSubmitting ? "Loging you in... " : "Log in"
                      }
                      style={{ color: "#ffffff" }}
                    />
                  </Form>
                );
              }}
            </Formik>
            {/* <Divider>
          <span>or</span>
        </Divider>

        <Button
          fullwidth
          title={"Continue with Facebook"}
          className="facebook"
          icon={<Facebook />}
          iconPosition="left"
          iconStyle={{ color: "#ffffff", marginRight: 5 }}
          onClick={loginCallback}
          style={{ color: "#ffffff" }}
        />

        <Button
          fullwidth
          title={"Continue with Google"}
          className="google"
          icon={<Google />}
          iconPosition="left"
          iconStyle={{ color: "#ffffff", marginRight: 5 }}
          onClick={loginCallback}
          style={{ color: "#ffffff" }}
        /> */}

            <Offer style={{ padding: "20px 0" }}>
              Don't have any account?{" "}
              <LinkButton onClick={toggleSignUpForm}>Sign Up</LinkButton>
            </Offer>
            <OfferSection>
              <Offer>
                Forgot your password?{" "}
                <LinkButton onClick={toggleForgotPassForm}>Reset It</LinkButton>
              </Offer>
            </OfferSection>
          </>
        )}{" "}
      </Container>
    </Wrapper>
  );
}
