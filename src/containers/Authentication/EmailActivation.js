import React, { useEffect, useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useRouteMatch, useHistory } from "react-router-dom";
import {
  TypedVerifyEmailMutation,
  TypedResendAactivationEmailMutation,
} from "./mutations";
import { maybe } from "core/utils";
import { normalizeErrors } from "helpers";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import { HelperText, Heading, SubHeading } from "./Authentication.style";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { emailActivationSchema } from "./validation.schema";
const showSuccessNotification = (data, alert) => {
  const successful = maybe(() => data.verifyAccount.success);
  const nonFieldErr = normalizeErrors(
    maybe(() => data.verifyAccount.errors, []),
  );
  if (successful) {
    alert.show(
      {
        title: "Verification Successful",
      },
      { type: "success", timeout: 5000 },
    );
    alert.show(
      {
        title: "Login to Access Dashboard",
      },
      { type: "neutral", timeout: 5000 },
    );
  }
  if (nonFieldErr) {
    alert.show(
      {
        title: nonFieldErr?.nonFieldErrors,
      },
      { type: "error", timeout: 5000 },
    );
  }
};

const EmailActivation = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const alert = useAlert();
  const [token] = useState(match.params.emailToken);
  const { authDispatch } = useContext(AuthContext);
  useEffect(() => {
    authDispatch({
      type: "ACTIVATE_ACCOUNT",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    authDispatch({
      type: "SIGNIN",
    });
    history.push(`/auth`);
  };

  return match.params.emailToken ? (
    <TypedVerifyEmailMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(verifyAccount, { loading, data }) => {
        function confirmActivation() {
          verifyAccount({
            variables: { token: token },
          }).then(({ data }) => {
            if (data?.verifyAccount?.success) {
              authDispatch({
                type: "SIGNIN",
              });
              history.push("/auth");
            }
          });
        }
        console.log(maybe(() => data.verifyAccount.errors, []));

        return (
          <>
            <div
              id="titlebar"
              className="photo-bg"
              style={{
                backgroundImage: "url(images/all-categories-photo.jpg)",
              }}
            >
              <div className="container-x">
                <div className="ten columns">
                  <h2>Account Activation</h2>
                </div>
              </div>
            </div>
            <div className="container-x">
              <div className="my-account">
                <div className="tabs-container">
                  <div
                    className="tab-content"
                    style={{
                      width: "fit-content",
                      margin: "0 auto",
                    }}
                  >
                    <Heading>Hello, Welcome Back!</Heading>
                    <SubHeading>
                      Click the button below to activate your Account
                    </SubHeading>

                    <h1
                      style={{
                        margin: "10px",
                        color: data?.verifyAccount?.success ? "green" : "blue",
                      }}
                    >
                      {data?.verifyAccount?.success ? (
                        "Verification Successful ✔"
                      ) : (
                        <Button
                          title="Activate Account"
                          onClick={confirmActivation}
                        />
                      )}
                    </h1>
                    {maybe(
                      () => !data?.sendPasswordResetEmail?.errors?.length,
                    ) ? null : (
                      <HelperText>
                        <p className=" lost_password">
                          <a onClick={handleLogin} href>
                            Login to continue
                          </a>
                        </p>
                      </HelperText>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </TypedVerifyEmailMutation>
  ) : (
    <TypedResendAactivationEmailMutation>
      {(resendActivationEmail, { loading, data }) => {
        function onSubmit({ values }) {
          resendActivationEmail({
            variables: values,
          }).then(({ data }) => {
            if (data?.resendActivationEmail?.success) {
              alert.show(
                {
                  title: "Email Sent Successfully",
                },
                { type: "success", timeout: 5000 },
              );
            } else {
              console.log(maybe(() => data.resendActivationEmail.errors, []));
            }
          });
        }

        return (
          <>
            <div
              id="titlebar"
              className="photo-bg"
              style={{
                backgroundImage: "url(images/all-categories-photo.jpg)",
              }}
            >
              <div className="container-x">
                <div className="ten columns">
                  <h2>Account Activation</h2>
                </div>
              </div>
            </div>
            <div className="container-x">
              <div className="my-account">
                <div className="tabs-container">
                  <div
                    className="tab-content"
                    style={{
                      width: "fit-content",
                      margin: "0 auto",
                    }}
                  >
                    <SubHeading>Not yet Received Email?</SubHeading>
                    <SubHeading>
                      Enter your Email to resend the activation Link
                    </SubHeading>
                    <Formik
                      initialValues={{ email: "" }}
                      validationSchema={emailActivationSchema}
                      onSubmit={onSubmit}
                    >
                      {(formik) => {
                        return (
                          <Form className="login">
                            <FormikControl
                              control="input"
                              type="email"
                              label="Email"
                              name="email"
                              icon="ln ln-icon-Mail"
                            />

                            <Button
                              type="submit"
                              disabled={!formik.isValid}
                              fullwidth
                              isLoading={loading}
                              title={loading ? "Resending... " : "Send"}
                              style={{ color: "#ffffff", margin: "16px 0" }}
                              //   {...(loading && { disabled: true })}
                            />
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </TypedResendAactivationEmailMutation>
  );
};

export default EmailActivation;
