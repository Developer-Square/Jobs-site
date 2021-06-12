import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { TypedPasswordResetMutation } from "./mutations";
import { maybe } from "core/utils";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { passwordResetSchema } from "./validation.schema";

const showSuccessNotification = (data, alert) => {
  const successful = maybe(() => !data.passwordReset.errors.length);

  if (successful) {
    alert.show(
      {
        title: data.passwordReset.requiresConfirmation
          ? "Please check your e-mail for further instructions"
          : "New user has been created",
      },
      { type: "success", timeout: 5000 }
    );
  }
};
const PasswordReset = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const [resetToken] = useState(match.params.resetToken);

  const initialValues = {
    token: resetToken,
    newPassword1: "",
    newPassword2: "",
  };

  return (
    <TypedPasswordResetMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(resetPassword, { loading, data }) => {
        function onSubmit(values, { setErrors, setSubmitting }) {
          console.log("to handle submit action");
          resetPassword({
            variables: values,
          });
          if (data) {
            if (data.passwordReset) {
              if (data.passwordReset?.success) {
                console.log("data received", data);
                history.push("/activate");
              } else {
                setErrors(
                  normalizeErrors(maybe(() => data.passwordReset.errors, []))
                );
              }
            }
          }
        }
        return (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={passwordResetSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form className="password-reset">
                    <FormikControl
                      control="input"
                      type="email"
                      label="Email"
                      name="email"
                      icon="ln ln-icon-Mail"
                    />
                    <FormikControl
                      control="input"
                      type="password"
                      label="Password"
                      name="password"
                      icon="ln ln-icon-Lock-2"
                    />

                    <Button
                      type="submit"
                      disabled={!formik.isValid}
                      fullwidth
                      loading={loading}
                      title={loading ? "authenticating... " : "Login"}
                      style={{ color: "#ffffff" }}
                      //   {...(loading && { disabled: true })}
                    />
                  </Form>
                );
              }}
            </Formik>
          </>
        );
      }}
    </TypedPasswordResetMutation>
  );
};

export default PasswordReset;
