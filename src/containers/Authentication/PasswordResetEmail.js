import React from "react";
import { useAlert } from "react-alert";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { maybe } from "core/utils";
import { TypedPasswordResetEmailMutation } from "./mutations";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { useHistory } from "react-router-dom";
import { passwordResetEmailSchema } from "./validation.schema";

const showSuccessNotification = (data, alert) => {
  const successful = maybe(() => !data.sendPasswordResetEmail.errors.length);

  if (successful) {
    alert.show(
      {
        title: data.sendPasswordResetEmail.requiresConfirmation
          ? "Please check your e-mail for further instructions"
          : "New user has been created",
      },
      { type: "success", timeout: 5000 },
    );
  }
};
const PasswordResetEmail = () => {
  const alert = useAlert();
  const history = useHistory();
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <TypedPasswordResetEmailMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(sendResetPasswordEmail, { loading, data }) => {
        function onSubmit(values, { setErrors, setSubmitting }) {
          console.log("to handle submit action");
          sendResetPasswordEmail({
            variables: values,
          });
          if (data) {
            if (data.sendPasswordResetEmail) {
              if (data.sendPasswordResetEmail?.success) {
                console.log("data received", data);
                history.push("/activate");
              } else {
                setErrors(
                  normalizeErrors(
                    maybe(() => data.sendPasswordResetEmail.errors, []),
                  ),
                );
              }
            }
          }
        }
        return (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={passwordResetEmailSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form className="password-reset-email">
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
                      title={loading ? "Sending Email... " : "Reset Password"}
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
    </TypedPasswordResetEmailMutation>
  );
};

export default PasswordResetEmail;
