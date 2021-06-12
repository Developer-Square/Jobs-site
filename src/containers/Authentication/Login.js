import React, { useContext } from "react";
import { useAlert } from "react-alert";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { maybe } from "core/utils";
import { TypedAccountLoginMutation } from "./mutations";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { useHistory } from "react-router-dom";
import { loginSchema } from "./validation.schema";
import { AuthContext } from "contexts/auth/auth.context";

const showSuccessNotification = (data, alert) => {
  const successful = maybe(() => !data.tokenAuth.errors.length);

  if (successful) {
    alert.show(
      {
        title: data.tokenAuth.requiresConfirmation
          ? "Please check your e-mail for further instructions"
          : "New user has been created",
      },
      { type: "success", timeout: 5000 }
    );
  }
};

const Login = () => {
  const { authDispatch } = useContext(AuthContext);
  const alert = useAlert();
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <TypedAccountLoginMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(registerUser, { loading, data }) => {
        function onSubmit(values, { setErrors, setSubmitting }) {
          console.log("to handle submit action");
          registerUser({
            variables: { email: values.email, password: values.password },
          });
          if (data) {
            if (data.register) {
              if (data.register?.success) {
                console.log("data received", data);
                history.push("/activate");
              } else {
                setErrors(
                  normalizeErrors(maybe(() => data.tokenAuth.errors, []))
                );
              }
            }
          }
        }
        return (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
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
                      style={{ color: "#ffffff", margin: "16px 0" }}
                      //   {...(loading && { disabled: true })}
                    />
                    <p class=" lost_password">
                      <a
                        onClick={() =>
                          authDispatch({
                            type: "FORGOTPASS",
                          })
                        }
                        href
                      >
                        Lost Your Password?
                      </a>
                    </p>
                  </Form>
                );
              }}
            </Formik>
          </>
        );
      }}
    </TypedAccountLoginMutation>
  );
};

export default Login;
