import React from "react";
import { useAlert } from "react-alert";

import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { maybe } from "core/utils";
import { TypedAccountRegistrationMutation } from "./mutations";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { useHistory } from "react-router";
import { registerSchema } from "./validation.schema";
import { HelperText } from "./Authentication.style";
import { TOS } from "constants/routes.constants";

const showSuccessNotification = (data, alert) => {
  const successful = maybe(() => data.register.success);
  console.log(normalizeErrors(maybe(() => data.register.errors, [])));

  if (successful) {
    alert.show(
      {
        title: "Registration Successful",
      },
      { type: "success", timeout: 5000 }
    );
    alert.show(
      {
        title: "Please check your e-mail for further instructions",
      },
      { type: "success", timeout: 5000 }
    );
  }
};

const Register = () => {
  const alert = useAlert();
  const history = useHistory();

  const initialValues = {
    username: "",
    email: "",
    password1: "",
    password2: "",
  };

  return (
    <TypedAccountRegistrationMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(registerUser, { loading, data }) => {
        function onSubmit(values, { setErrors }) {
          registerUser({
            variables: values,
          }).then(() => {
            console.log(data);
            if (data) {
              if (data.register) {
                if (data.register.success) {
                  console.log("data received", data);
                  history.push("/auth/activate");
                } else {
                  // setErrors(normalizeErrors(data.register.errors));
                  setErrors(
                    normalizeErrors(maybe(() => data.register.errors, []))
                  );
                }
              }
            }
          });
        }
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            //   onSubmit={onSubmit}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="register">
                  <FormikControl
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                    icon="ln ln-icon-Mail"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Username"
                    name="username"
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
                  <HelperText style={{ padding: "20px 0px 10px" }}>
                    By signing up, you agree to The Database's{" "}
                    <strong
                      style={{ color: "#21277f" }}
                      onClick={() => history.push(`${TOS}`)}
                    >
                      Terms &amp; Condtions
                    </strong>
                  </HelperText>

                  <Button
                    type="submit"
                    disabled={!formik.isValid}
                    fullwidth
                    loading={loading}
                    title={loading ? "Creating Account ... " : "Register"}
                    style={{ color: "#ffffff" }}
                    //   {...(loading && { disabled: true })}
                  />
                </Form>
              );
            }}
          </Formik>
        );
      }}
    </TypedAccountRegistrationMutation>
  );
};

export default Register;
