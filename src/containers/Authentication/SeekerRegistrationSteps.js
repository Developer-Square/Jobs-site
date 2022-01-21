import React, { useEffect } from "react";
import { Form, Formik } from "formik";
// import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  signUpSchema,
  OTPVerficationSchema,
  furtherInformationSchema,
} from "./validation.schema";
import { HelperText } from "./Authentication.style";
import FormikControl from "../FormikContainer/FormikControl";
import Button from "components/Button/Button";
import { TOS } from "constants/routes.constants";
// import { Typography } from "@material-ui/core";
import { TypedCreateSelectableInstitutionMutation } from "./mutations";
import { showSuccessNotification, IsNotEmpty } from "helpers";
// import Loader from "components/Loader/Loader";
import CoursesSearch from "components/CoursesSearch/CoursesSearch";

export const SignUp = ({
  initialValues,
  onSubmit,
  setSwitchTab,
  checked,
  handleChange,
  loading,
  history,
  fillFields,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="register" noValidate>
            <Spacer>
              <Link to={"/auth"} onClick={() => setSwitchTab("")}>
                {`<`} Select Different Option{" "}
              </Link>
            </Spacer>

            {/* Email validation not working */}
            <FormikControl
              control="input"
              type="text"
              label="Email"
              name="email"
              icon="ln ln-icon-Mail"
            />
            <FormikControl
              control="phone"
              type="number"
              label="Phone number"
              name="phone"
              icon="ln ln-icon-Mail"
            />
            <FormikControl
              control="input"
              type="text"
              label="Full name"
              name="fullName"
              icon="ln ln-icon-Male"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password1"
              icon="ln ln-icon-Lock-2"
            />
            <FormikControl
              control="input"
              type="password"
              label="Confirm Password"
              name="password2"
              icon="ln ln-icon-Lock-2"
            />

            <TermsSection>
              <div>
                <FormikControl
                  control="single-checkbox"
                  name="terms"
                  checked={false}
                  color="primary"
                  style={{ marginTop: "16px" }}
                />
              </div>

              <HelperText style={{ padding: "20px 0px 10px", width: "200px" }}>
                I agree to the{"  "}
                <Link
                  style={{ color: "#1849B1" }}
                  onClick={() => history.push(`${TOS}`)}
                >
                  <strong>Terms &amp; Conditions</strong>
                </Link>
              </HelperText>
            </TermsSection>

            <Spacer marginTopBottom="17px 0" />

            <Button
              type="submit"
              disabled={!formik.isValid}
              fullwidth
              isLoading={loading}
              title={loading ? "Signing Up ... " : "Sign Up"}
              style={{ color: "#ffffff" }}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export const OTPForm = ({
  loading,
  initialValues,
  onSubmit,
  onSignInSubmit,
  alert,
  resendRequest,
}) => {
  const [smsResend, setSmsResend] = React.useState(false);

  useEffect(() => {
    // Disable the resend sms link when a request to
    // send the otp code has been sent.
    if (resendRequest) {
      setSmsResend(true);
      alert.show(
        {
          title: "verify phone no. code has been resent to your phone",
        },
        { type: "success", timeout: 5000 },
      );
    }
    // eslint-disable-next-line
  }, [resendRequest]);

  const resendSms = () => {
    let values = localStorage.getItem("registerValues");
    values = JSON.parse(values);
    onSignInSubmit(values.phone, true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OTPVerficationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form noValidate>
            <FormikControl
              control="code"
              type="text"
              label="Confirmation Code"
              name="otpcode"
              icon="ln ln-icon-Lock-2"
            />

            <Spacer>
              <p>
                Didn't receive the code?{" "}
                <Resend smsResend={smsResend} onClick={resendSms}>
                  Resend
                </Resend>
              </p>
            </Spacer>

            <Button
              type="submit"
              disabled={!formik.isValid}
              fullwidth
              isLoading={loading}
              title={loading ? "Verifying ... " : "Verify"}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export const FurtherInformation = ({
  switchTabs,
  loading,
  schoolOptions,
  industries,
  courses,
  initialValues,
  onSeekerProfileSubmit,
  alert,
}) => {
  const [showButton, setShowButton] = React.useState(true);

  const handleButton = (data) => {
    if (data === "focus") {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };

  const submitCreateInstitution = (values, createInstitution, options) => {
    let optionInBackend = false;
    // Check whether the institution provided is already among the backend
    // options.
    // eslint-disable-next-line
    options.map((option) => {
      if (option.value === values.value) {
        optionInBackend = true;
      }
    });

    if (!optionInBackend) {
      // Prepare the data to be sent in the format expected in the backend.
      values.name = values.value;
      values.text = "";
      values.chatroom = "";

      createInstitution({
        variables: values,
      })
        .then(({ data }) => {
          if (data.createSelectableInstitution.success) {
            alert.show(
              {
                title: "Institution created successfully",
              },
              { type: "success", timeout: 5000 },
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={furtherInformationSchema}
      onSubmit={onSeekerProfileSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <Spacer>
              <Link to={"/auth"} onClick={() => switchTabs("", "back")}>
                {`<`} Go to previous tab{" "}
              </Link>
            </Spacer>

            <TypedCreateSelectableInstitutionMutation
              onCompleted={(data) => showSuccessNotification(data, alert)}
            >
              {(createInstitution) => {
                function onSubmit(values) {
                  if (values) {
                    if (IsNotEmpty(values.value)) {
                      submitCreateInstitution(
                        values,
                        createInstitution,
                        schoolOptions,
                      );
                    }
                  }
                }
                return (
                  <FormikControl
                    control="create-select"
                    id="createSelect"
                    hideButton={(data) => handleButton(data)} // Hide the button when a select input is open, to avoid UI interferance from the button.
                    options={schoolOptions}
                    setFieldValue={formik.setFieldValue}
                    action={onSubmit}
                    directUpload={true}
                    label="Institution/School"
                    name="school"
                    icon="ln ln-icon-Lock-2"
                  />
                );
              }}
            </TypedCreateSelectableInstitutionMutation>

            <CoursesSearch label="Course" name="course" />
            <FormikControl
              control="select"
              isMulti
              options={industries}
              showButton={showButton}
              hideButton={(data) => handleButton(data)} // Hide the button when a select input is open, to avoid UI interferance from the button.
              label="Industries to look for Jobs"
              name="industries"
              id="basic-multi-select"
              classNamePrefix="select"
              icon="ln ln-icon-Lock-2"
            />
            {/* This is here as the dropdown appears behind the submit button
            hence we need to add some extra space */}
            <Spacer marginTopBottom="100px 0" />
            {showButton ? (
              <Button
                type="submit"
                disabled={!formik.isValid}
                fullwidth
                isLoading={loading}
                title={loading ? "Saving..." : "Get Started"}
              />
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};

const Resend = styled.div`
  display: inline-block;
  color: ${(props) => (props.smsResend ? "rgba(0, 0, 0, 0.38)" : "#1849B1")};
  font-weight: bold;
  pointer-events: ${(props) => (props.smsResend ? "none" : "all")};
  cursor: pointer;
`;

const TermsSection = styled.div`
  display: flex;
  justify-content: center;
`;

const Spacer = styled.div`
  margin: ${(props) =>
    props.marginTopBottom ? props.marginTopBottom : "15px 0"};
`;

// const Title = styled.p`
//   margin: 12px 0;
//   font-size: 15px;
//   text-decoration: none;
//   color: black;
//   cursor: pointer;
// `;
