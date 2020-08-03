import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Blank, Wrapper, Title, Header } from "./styles";
import { Link } from "../../components/Link";
import { H5 } from "../../components/H5";
import { Button } from "../../components/Button";
import FormikControl from "../Formik/FormikControl";
import { useMutation } from "@apollo/react-hooks";
import { PASSWORD_RESET } from "./mutations";
import { normalizeErrors, useTimer } from "utils";
import Loader from "components/Loader";

function PasswordReset() {
  const [reset, setReset] = useState();
  const match = useRouteMatch();
  const history = useHistory();
  const [resetToken] = useState(match.params.resetToken);
  const [resetPassword] = useMutation(PASSWORD_RESET);
  const [count, SetCount] = useState(5);
  const counter = useTimer(count);
  const passwordNotLongEnough = "password must be at least 8 characters";
  const passwordDoNotMatch = "passwords must match";
  const fieldRequired = "This field is required";

  const initialValues = {
    token: resetToken,
    newPassword1: "",
    newPassword2: ""
  };

  const validationSchema = Yup.object({
    newPassword1: Yup.string()
      .min(8, passwordNotLongEnough)
      .max(100)
      .required(fieldRequired),
    newPassword2: Yup.string()
      .oneOf([Yup.ref("newPassword1"), null], passwordDoNotMatch)
      .required(fieldRequired)
  });

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("the values hapa: ", values);

    try {
      const { data, loading, errors } = await resetPassword({
        variables: values
      });

      console.log("data: ", data, "loading : ", loading, "errors : ", errors);
      if (loading) return <p>Loading ...</p>;
      if (errors) {
        console.log(errors);
        console.log("errors from function:", errors.message);
        return errors;
      }
      if (data) {
        if (data.passwordReset.success) {
          setReset("Password Changed Successfully ✔");
          setSubmitting(false);
          SetCount(5);
          alert("successful");
          await new Promise(resolve => setTimeout(resolve, 2000));
          history.push("/login");
        } else {
          setReset(null);
          setErrors(normalizeErrors(data.passwordReset.errors));
          setSubmitting(false);
        }
      }
      return null;
    } catch (error) {
      console.log("catch errors: ", JSON.stringify(error));
    }
  };

  return (
    <>
      <Title>
        <H5>
          <Link to="/">{"<"} Home</Link>
        </H5>
      </Title>
      <Wrapper>
        <Header>
          <h1>Reset Password</h1>
          <h3
            style={{
              color:
                reset === undefined ||
                reset === "Password Changed Successfully ✔"
                  ? "green"
                  : "red"
            }}
          >
            {reset === undefined ? null : (
              <>
                <>{reset}</>
                <h5>redirecting in {counter}...</h5>
              </>
            )}
          </h3>
          <h5>Input the new password</h5>
        </Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => {
            return (
              <Form>
                <FormikControl
                  control="input"
                  type="password"
                  label="New Password"
                  name="newPassword1"
                />
                <FormikControl
                  control="input"
                  type="password"
                  label="Confirm New Password"
                  name="newPassword2"
                />

                <Blank />
                <Blank />

                <Button type="submit" disabled={!formik.isValid}>
                  {formik.isSubmitting ? <Loader /> : "Reset Password"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
    </>
  );
}

export default PasswordReset;
