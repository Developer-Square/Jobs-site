import React from "react";
import { useAlert } from "react-alert";
import { TypedPasswordChangeMutation } from "./mutations";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { passwordChangeSchema } from "./validation.schema";
import Button from "components/Button/Button";
import { maybe } from "core/utils";
import { normalizeErrors } from "helpers";

const PasswordChange = () => {
  const alert = useAlert();

  const initialValues = {
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
  };
  const showNotification = (data, alert) => {
    const successful = maybe(() => data.passwordChange.success);
    if (successful) {
      alert.show(
        {
          title: "Password Changed",
        },
        { type: "success", timeout: 5000 },
      );
    } else {
      const nonFieldErr = normalizeErrors(
        maybe(() => data.passwordChange.errors, []),
      );
      alert.show(
        {
          title: nonFieldErr?.nonFieldErrors,
        },
        { type: "error", timeout: 5000 },
      );
    }
  };

  return (
    <TypedPasswordChangeMutation
      onCompleted={(data) => showNotification(data, alert)}
    >
      {(changePassword, { loading }) => {
        function onSubmit(values) {
          changePassword({
            variables: values,
          }).then(({ data }) => {
            console.log("handling the callback");
          });
        }
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={passwordChangeSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="changePassword">
                  <FormikControl
                    control="input"
                    type="password"
                    label="Current Password"
                    name="oldPassword"
                    className="margin-top-0"
                    icon="ln ln-icon-Lock-2"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="New Password"
                    name="newPassword1"
                    icon="ln ln-icon-Lock-2"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Confirm New Password"
                    name="newPassword2"
                    icon="ln ln-icon-Lock-2"
                  />
                  <Button
                    type="submit"
                    className="button margin-top-15"
                    disabled={!formik.isValid}
                    fullwidth
                    isLoading={loading}
                    title={loading ? "changing... " : "Change Password"}
                    style={{ color: "#ffffff" }}
                    //   {...(loading && { disabled: true })}
                  />
                </Form>
              );
            }}
          </Formik>
        );
      }}
    </TypedPasswordChangeMutation>
  );
};

export default PasswordChange;
