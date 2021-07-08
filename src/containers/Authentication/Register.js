import React from "react";
import { useAlert } from "react-alert";

import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { maybe } from "core/utils";
import { TypedAccountRegistrationMutation } from "./mutations";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { registerSchema } from "./validation.schema";
import { HelperText } from "./Authentication.style";
import { TOS } from "constants/routes.constants";
import { useHistory, useRouteMatch, Link } from "react-router-dom";

const showSuccessNotification = (data, alert) => {
  const successful = maybe(() => data.register.success);

  if (successful) {
    alert.show(
      {
        title: "Registration Successful",
      },
      { type: "success", timeout: 5000 },
    );
    alert.show(
      {
        title: "Check your e-mail for further instructions",
      },
      { type: "success", timeout: 5000 },
    );
  } else {
    const err = maybe(() => data.register.errors, []);

    if (err) {
      const nonFieldErr = normalizeErrors(
        maybe(() => data.register.errors, []),
      );
      alert.show(
        {
          title: nonFieldErr?.nonFieldErrors,
        },
        { type: "error", timeout: 5000 },
      );
    }
  }
};

const Register = () => {
  const alert = useAlert();
  const history = useHistory();
  const match = useRouteMatch();
  const [isSeeker, setIsSeeker] = React.useState(false);
  const [isEmployer, setIsEmployer] = React.useState(false);
  const [isInstitution, setIsInstitution] = React.useState(false);
  const [switchTab, setSwitchTab] = React.useState(false);

  React.useEffect(() => {
    if (match.params.userType) {
      setSwitchTab(false);
      if (match.params.userType === "business") {
        setIsSeeker(false);
        setIsEmployer(true);
        setIsInstitution(false);
      } else if (match.params.userType === "seeker") {
        setIsSeeker(true);
        setIsEmployer(false);
        setIsInstitution(false);
      } else if (match.params.userType === "institution") {
        setIsSeeker(false);
        setIsEmployer(false);
        setIsInstitution(true);
      }
    } else {
      setSwitchTab(true);
    }
  }, [match.params.userType]);

  const initialValues = {
    username: "",
    email: "",
    isSeeker: isSeeker,
    isEmployer: isEmployer,
    isInstitution: isInstitution,
    password1: "",
    password2: "",
  };
  return (
    <TypedAccountRegistrationMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(registerUser, { loading }) => {
        function onSubmit(values, { setErrors }) {
          registerUser({
            variables: values,
          }).then(({ data }) => {
            console.log(data);
            if (data.register.success) {
              console.log("data received", data);
              history.push("/auth/activate");
            } else {
              // setErrors(normalizeErrors(data.register.errors));
              setErrors(normalizeErrors(maybe(() => data.register.errors, [])));
            }
          });
        }
        return switchTab ? (
          <div className="register">
            <div
              style={{
                textAlign: "center",
                padding: "30px 0",
              }}
            >
              <h4>Hi there, Welcome...</h4>
              <h5>Select an option to get started.</h5>
            </div>

            <div style={{ display: "flex", margin: "5px" }}>
              <Button
                style={{ margin: "0 5px", width: "100%" }}
                title={`Job Seeker`}
                onClick={() => history.push(`/auth/p/seeker`)}
              />
              <Button
                style={{ margin: "0 5px", width: "100%" }}
                title={`Institution`}
                onClick={() => history.push(`/auth/p/institution`)}
              />
              <Button
                style={{ margin: "0 5px", width: "100%" }}
                title={`Business`}
                onClick={() => history.push(`/auth/p/business`)}
              />
            </div>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="register">
                  <Link to={"/auth"}>{`<`} Select Different Option </Link>

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
