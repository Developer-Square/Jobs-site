/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { useAlert } from "react-alert";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { maybe } from "core/utils";
import { TypedAccountLoginMutation } from "./mutations";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { useHistory, useLocation } from "react-router-dom";
import { loginSchema } from "./validation.schema";
import { AuthContext } from "contexts/auth/auth.context";
import { addObjectToLocalStorageObject, addArrayToLocalStorage } from "helpers";

const Login = () => {
  const { authDispatch } = useContext(AuthContext);
  const alert = useAlert();
  const history = useHistory();
  const location = useLocation();

  const initialValues = {
    email: "",
    password: "",
  };

  const showNotification = (data, errors, alert) => {
    console.log(errors);
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
        { type: "success", timeout: 5000 }
      );
      console.log("data received", data);
      var roles = [];

      if (data.tokenAuth.user.isStaff) {
        roles.push("admin");
      }
      if (data.tokenAuth.user.isIndividual) {
        roles.push("seeker");
      }
      if (data.tokenAuth.user.isBusiness) {
        roles.push("business");
      }
      // if (data.tokenAuth.user.isEmployer) {
      //   roles.push("employer");
      // }
      // if (data.tokenAuth.user.isInstitution) {
      //   roles.push("institution");
      // }
      addArrayToLocalStorage("thedb_auth_roles", roles);
      localStorage.setItem("access_token", data.tokenAuth.token);
      addObjectToLocalStorageObject("thedb_auth_payload", {
        refreshToken: data.tokenAuth.refreshToken,
        token: data.tokenAuth.token,
      });
      addObjectToLocalStorageObject("thedb_auth_profile", data.tokenAuth.user);
      if (location.state !== undefined) {
        history.push(location.state.referrer);
      } else {
        history.push("/dashboard");
      }
    } else {
      const nonFieldErr = normalizeErrors(
        maybe(() => data.tokenAuth.errors, [])
      );
      alert.show(
        {
          title: nonFieldErr?.nonFieldErrors,
        },
        { type: "error", timeout: 5000 }
      );
    }
  };

  return (
    <TypedAccountLoginMutation
      onCompleted={(data, errors) => showNotification(data, errors, alert)}
    >
      {(registerUser, { loading, data }) => {
        function onSubmit(values) {
          registerUser({
            variables: values,
          }).then(() => {
            console.log("handling the then");
          });
        }
        return (
          <>
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
          </>
        );
      }}
    </TypedAccountLoginMutation>
  );
};

export default Login;
