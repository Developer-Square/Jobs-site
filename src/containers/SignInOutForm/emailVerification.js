import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  LinkButton,
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  Offer,
  Divider,
} from "./SignInOutForm.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import { Facebook } from "components/AllSvgIcon";

const EmailVerification = () => <EmailForm />;

function EmailForm() {
  let location = useLocation();
  let history = useHistory();
  console.log("the locatrion props: ", location);
  console.log("the history props: ", history);

  // const [resendVerification] = useMutation(RESEND_ACTIVATION_EMAIL_MUTATION);

  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";
  const getEmail = () => {
    const pureJSON = localStorage.getItem("thedb_auth_profile");
    const accessToken = JSON.parse(pureJSON);
    if (accessToken === null || undefined) {
      return false;
    } else {
      return accessToken.email;
    }
  };
  const initialValues = {
    email: !getEmail() ? "" : getEmail(),
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),
  });

  const onSubmit = async (values, { props, setErrors, setSubmitting }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("the values hapa : ", values);
    // try {
    //   const { data, loading, errors } = await resendVerification({
    //     variables: values,
    //   });

    //   console.log("data: ", data, "loading : ", loading, "errors : ", errors);
    //   if (loading) return <p>Loading ...</p>;
    //   if (errors) {
    //     console.log(errors);
    //     console.log("errors from function:", errors.message);
    //     return errors;
    //   }
    //   if (data) {
    //     if (data.resendActivationEmail.success) {
    //       console.log("data received", data);
    //       window.alert("semail link sent"); //do something other than alert
    //       setSubmitting(false);
    //     } else {
    //       console.log("the props", props);
    //       setErrors(err.response.data);
    //       setSubmitting(false);
    //     }
    //   }
    //   return null;
    // } catch (error) {
    //   console.log("catch errors: ", JSON.stringify(error));
    // }
  };

  return (
    <Wrapper style={{ paddingTop: "55px" }}>
      <Container>
        <Heading>Email Verification</Heading>

        <SubHeading>check your email for email confirmation</SubHeading>
        {/* <SubHeading>Enter email address for verification</SubHeading> */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                />

                <Button
                  type="submit"
                  disabled={!formik.isValid}
                  fullwidth
                  title={formik.isSubmitting ? "Sending ..." : "Resend Email"}
                  style={{ color: "#ffffff" }}
                />
                <Divider>
                  <span>or continue with</span>
                </Divider>

                <Button
                  fullwidth
                  title={"Facebook"}
                  iconPosition="left"
                  className="facebook"
                  icon={<Facebook />}
                  iconStyle={{ color: "#ffffff", marginRight: 5 }}
                  style={{ color: "#ffffff" }}
                />

                <Offer style={{ padding: "20px 0" }}>
                  Already have an account?{" "}
                  <LinkButton onClick={() => alert("will do that")}>
                    Login"
                  </LinkButton>
                </Offer>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Wrapper>
  );
}

export default EmailVerification;
