/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { storeLoginDetails } from "utils/storeLoginCredentials";

const Login = () => {
  const { authDispatch } = useContext(AuthContext);
  const alert = useAlert();
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const showNotification = (data, errors, alert) => {
    if (errors) {
      console.log("Server Error kwa login", errors[0].message);
      return errors[0].message;
    }

    const successful = maybe(() => data.tokenAuth.success);

    if (successful) {
      alert.show(
        {
          title: "Login Successful",
        },
        { type: "success", timeout: 5000 },
      );
    } else {
      const nonFieldErr = normalizeErrors(
        maybe(() => data.tokenAuth.errors, []),
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
    <TypedAccountLoginMutation
      onCompleted={(data, errors) => showNotification(data, errors, alert)}
    >
      {(registerUser, { loading }) => {
        function onSubmit(values, { setErrors, setSubmitting }) {
          registerUser({
            variables: values,
          }).then(({ data }) => {
            const successful = maybe(() => data.tokenAuth.success);
            storeLoginDetails(successful, history, data, setErrors, setSubmitting, 'login')
          });
        }
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              // console.log(formik);
              // if (!data?.tokenAuth?.success) {
              //   formik.setErrors(
              //     normalizeErrors(maybe(() => data.tokenAuth.errors, []))
              //   );
              // }
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
                    isLoading={loading}
                    title={loading ? "authenticating... " : "Login"}
                    style={{ color: "#ffffff", margin: "16px 0" }}
                    //   {...(loading && { disabled: true })}
                  />
                  <p className=" lost_password">
                    <a
                      onClick={() =>
                        authDispatch({
                          type: "FORGOTPASS",
                        })
                      }
                    >
                      Lost Your Password?
                    </a>
                  </p>
                </Form>
              );
            }}
          </Formik>
        );
      }}
    </TypedAccountLoginMutation>
  );
};

export default Login;
