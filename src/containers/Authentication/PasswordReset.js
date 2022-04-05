import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { TypedPasswordResetMutation } from "./mutations";
import { maybe } from "core/utils";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { passwordResetSchema } from "./validation.schema";
import bgImg from "image/12.jpg";

const showSuccessNotification = (data, alert) => {
  const successful = maybe(() => data.passwordReset.success);

  if (successful) {
    alert.show(
      {
        title: "Password Has been reset",
      },
      { type: "success", timeout: 5000 },
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
          }).then(({ data }) => {
            if (data.passwordReset) {
              if (data?.passwordReset?.success) {
                console.log("data received", data);
                history.push("/auth");
              } else {
                setErrors(
                  normalizeErrors(maybe(() => data.passwordReset.errors, [])),
                );
              }
            }
          });
        }
        return (
          <div
            className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundColor: "#f7f7f7",
              backgroundImage: `linear-gradient(to right, rgb(33 39 127 / 0.72), rgb(33 39 127 / 0.72)),url(${bgImg})`,
            }}
          >
            <div className=" my-account p-0 m-0">
              <div className="bg-gray-100 shadow-md p-8 rounded-xl w-50 min-h-md items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="font-medium self-center text-xl sm:text-3xl text-gray-800  items-center justify-center">
                    Reset Password
                  </div>
                </div>
                <div className="items-center justify-center">
                  <div className="flex justify-center items-center mt-6">
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
                              type="password"
                              label="New Password"
                              name="newPassword1"
                              icon="ln ln-icon-Lock-2"
                            />
                            <FormikControl
                              control="input"
                              type="password"
                              label="Confirm Password"
                              name="newPassword2"
                              icon="ln ln-icon-Lock-2"
                            />

                            <Button
                              type="submit"
                              disabled={!formik.isValid}
                              fullwidth
                              loading={loading}
                              title={loading ? "authenticating... " : "Reset"}
                              style={{ color: "#ffffff" }}
                            />
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </TypedPasswordResetMutation>
  );
};

export default PasswordReset;
