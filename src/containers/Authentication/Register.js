import React from "react";

const Register = () => {
  return (
    <div>
      <p>hd</p>
    </div>
  );
};

export default Register;

// import React from "react";
// import { useAlert } from "react-alert";
// import { useHistory } from "react-router-dom";
// import * as Yup from "yup";
// import { Form, Formik } from "formik";
// import FormikControl from "containers/FormikContainer/FormikControl";
// import { maybe } from "core/utils";
// import TypedAccountLoginMutation, { SIGNUP_MUTATION } from "./mutations";
// import { useMutation } from "react-apollo";
// import Button from "components/Button/Button";

// const showSuccessNotification = (data, alert) => {
//   const successful = maybe(() => !data.accountRegister.errors.length);

//   if (successful) {
//     alert.show(
//       {
//         title: data.accountRegister.requiresConfirmation
//           ? "Please check your e-mail for further instructions"
//           : "New user has been created",
//       },
//       { type: "success", timeout: 5000 }
//     );
//   }
// };

// const Login = () => {
//   const alert = useAlert();

//   let history = useHistory();

//   const [registerUser] = useMutation(SIGNUP_MUTATION);

//   const emailNotLongEnough = "email must be at least 3 characters";
//   const emailRequired = "Please enter an email address";
//   const invalidEmail = "email must be a valid email";
//   const nameNotLongEnough = "user name must be at least 4 characters";
//   const passwordNotLongEnough = "password must be at least 8 characters";
//   const passwordDoNotMatch = "passwords must match";
//   const fieldRequired = "This field is required";

//   const initialValues = {
//     username: "",
//     email: "",
//     password1: "",
//     password2: "",
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .min(3, emailNotLongEnough)
//       .max(100)
//       .email(invalidEmail)
//       .required(emailRequired),
//     username: Yup.string()
//       .min(4, nameNotLongEnough)
//       .max(100)
//       .required(fieldRequired),
//     password1: Yup.string()
//       .min(8, passwordNotLongEnough)
//       .max(100)
//       .required(fieldRequired),
//     password2: Yup.string()
//       .oneOf([Yup.ref("password1"), null], passwordDoNotMatch)
//       .required(fieldRequired),
//   });

//   function onSubmit(values, { setErrors, setSubmitting }) {
//     console.log("to handle submit action");
//   }
//   return (
//     <TypedAccountLoginMutation
//       onCompleted={(data) => showSuccessNotification(data, alert)}
//     >
//       {(registerUser, { loading, data }) => {

//         return (
//           <>
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//             //   onSubmit={onSubmit}
//               onSubmit={() => registerUser({ variables: { email, password } });}
//             >
//               {(formik) => {
//                 return (
//                   <Form>
//                     <FormikControl
//                       control="input"
//                       type="email"
//                       label="Email"
//                       name="email"
//                     />
//                     <FormikControl
//                       control="input"
//                       type="password"
//                       label="Password"
//                       name="password"
//                     />

//                     <Button
//                       type="submit"
//                       disabled={!formik.isValid}
//                       fullwidth
//                       loading={loading}
//                       title={loading ? "authenticating... " : "Login"}
//                       style={{ color: "#ffffff" }}
//                       //   {...(loading && { disabled: true })}
//                     />
//                   </Form>
//                 );
//               }}
//             </Formik>
//             <Form
//               errors={maybe(() => data.accountRegister.errors, [])}
//               onSubmit={(event, { email, password }) => {
//                 event.preventDefault();
//                 const redirectUrl = `${location.origin}${paths.accountConfirm}`;
//                 registerUser({ variables: { email, password } });
//               }}
//             ></Form>
//           </>
//         );
//       }}
//     </TypedAccountLoginMutation>
//   );
// };

// export default Login;
