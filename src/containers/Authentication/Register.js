import React from "react";
import { useAlert } from "react-alert";
import firebase from "firebase";
// import { useLazyQuery } from "react-apollo";
import Button from "components/Button/Button";
// import { showSuccessNotification, showNotification, IsNotEmpty } from "helpers";
import { showSuccessNotification, normalizeErrors, IsNotEmpty } from "helpers";
import { prepareData } from "./auth-helpers";
import { useHistory, useRouteMatch } from "react-router-dom";
import { OTPForm, SignUp } from "./SeekerRegistrationSteps";
import {
  TypedAccountRegistrationMutation,
  TypedAccountLoginMutation,
} from "./mutations";
import { maybe } from "misc";
import { storeLoginDetails } from "utils";
import { AuthContext } from "contexts/auth/auth.context";
import UserContext from "contexts/user/user.provider";

const Register = ({ activeStep, setActiveStep, switchTab, setSwitchTab }) => {
  const alert = useAlert();
  const history = useHistory();
  const match = useRouteMatch();
  const { authDispatch } = React.useContext(AuthContext);
  const { setRefetchUser, setUserType } = React.useContext(UserContext);
  const [isSeeker, setIsSeeker] = React.useState(false);
  const [isEmployer, setIsEmplolyer] = React.useState(false);
  const [isInstitution] = React.useState(false);
  const [firebaseResult, setFirebaseResult] = React.useState("");
  const [resendRequest, setResendRequest] = React.useState(false);
  // const [fetchCourses] = useLazyQuery(GET_FILTERED_COURSES, {
  //   variables:{
  //     first: 100,
  //     filter:{
  //       industries: []
  //     }
  //   },
  //   fetchPolicy: "no-cache",
  //   // onCompleted: (data) => {
  //   //   setUser(data?.me);
  //   // },
  // });

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
    isEmployer,
    isSeeker,
    isInstitution,
    terms: false,
  };

  const otpCodeValue = {
    otpcode: "",
  };

  React.useEffect(() => {
    if (match.params) {
      if (match.params.userType === "seeker") {
        setIsSeeker(true);
        setIsEmplolyer(false);
        initialValues.isSeeker = true;
        initialValues.isEmployer = false;
      } else if (match.params.userType === "business") {
        setIsEmplolyer(true);
        setIsSeeker(false);
        initialValues.isSeeker = false;
        initialValues.isEmployer = true;
      }
    } // eslint-disable-next-line
  }, [match.params.userType, switchTab, initialValues]);

  // Switches between different steps i.e. from step 1 to step 2
  const switchTabs = (type, direction) => {
    if (direction === "forward") {
      setActiveStep((currStep) => currStep + 1);
    } else if (direction === "back") {
      setActiveStep((currStep) => currStep - 1);
    }

    if (type === "seeker") {
      localStorage.setItem("thedb_user", "Employer");
      setUserType("Employer");
      history.push(`/auth/p/seeker`);
      setSwitchTab(type);
    } else if (type === "business") {
      localStorage.setItem("thedb_user", "Seeker");
      setUserType("Seeker");
      history.push("/auth/p/business");
      setSwitchTab(type);
    }
  };

  const onSignInSubmit = (phone, resend) => {
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setFirebaseResult(confirmationResult);
        // Set setResendRequest to true so that we can know the function resolved in the resendSms
        // function. resendSms() is in the OTPForm.
        if (resend) {
          setResendRequest(true);
        }
      })
      .catch((error) => {
        // Error; SMS not sent
        showSuccessNotification("firebase", alert, error);
      });
  };

  // Send the phone number to firebase for otp verification.
  const triggerFirebaseSignIn = (phone) => {
    // First hide the reCAPTCHA then submit the phone number.
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      },
    );
    onSignInSubmit(phone);
  };

  const sendVerifactionCode = (code, userLogin, setErrors) => {
    // switchTabs('', 'forward')

    // to remove ==================
    //
    //
    //
    if (code === "000111") {
      let values = localStorage.getItem("registerValues");
      values = JSON.parse(values);
      alert.show(
        {
          title: "Phone verified successfully",
        },
        { type: "success", timeout: 5000 },
      );

      userLogin({
        variables: {
          email: values.email,
          password: values.password1,
        },
      })
        .then(({ data }) => {
          const successful = maybe(() => data.tokenAuth.success);
          storeLoginDetails(successful, "", data, setErrors);

          authDispatch({
            type: "LOGIN_SUCCESS",
          });
        })
        .then(() => {
          setRefetchUser((prev) => !prev);
        })
        .then(() => {
          history.push(`/dashboard`);
        });

      // switchTabs("", "forward");
    }
    //
    //
    //
    //
    // to remove

    firebaseResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // If the object has values then proceed.
        if (Object.values(user).length > 0) {
          alert.show(
            {
              title: "Phone verified successfully",
            },
            { type: "success", timeout: 5000 },
          );

          // When the verification is successfull, login the user.
          let values = localStorage.getItem("registerValues");
          values = JSON.parse(values);

          userLogin({
            variables: {
              email: values.email,
              password: values.password1,
            },
          })
            .then(({ data }) => {
              const successful = maybe(() => data.tokenAuth.success);
              storeLoginDetails(successful, "", data, setErrors);

              authDispatch({
                type: "LOGIN_SUCCESS",
              });
            })
            .then(() => {
              setRefetchUser((prev) => !prev);
            })
            .then(() => {
              history.push(`/dashboard`);
            });
        }
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        showSuccessNotification("firebase", alert, error);
      });
  };

  // Send the user's details to the api.
  const registerUserFn = async (registerUser, values, setErrors) => {
    const sentData = await prepareData(values);

    registerUser({
      variables: sentData,
    }).then(({ data }) => {
      if (data.register.success) {
        triggerFirebaseSignIn(sentData.phone);
        localStorage.setItem("registerValues", JSON.stringify(sentData));
        switchTabs("", "forward");
      } else {
        setErrors(normalizeErrors(maybe(() => data.register.errors, [])));
      }
    });
  };

  return (
    <TypedAccountRegistrationMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(registerUser, { loading }) => {
        function onSubmit(values, { setErrors }) {
          // Check if the object values are populated before sending.
          if (IsNotEmpty(values)) {
            registerUserFn(registerUser, values, setErrors);
          }
        }
        // eslint-disable-next-line
        return (activeStep === 0 && switchTab === "seeker") ||
          (activeStep === 0 && switchTab === "business") ? (
          <>
            {/* Using the SignUp Form for both seeker and business tabs as the fields are similar. */}
            <SignUp
              initialValues={initialValues}
              onSubmit={onSubmit}
              setSwitchTab={setSwitchTab}
              loading={loading}
              history={history}
            />
            <div id="sign-in-button"></div>
          </>
        ) : // eslint-disable-next-line
        (activeStep === 1 && switchTab === "seeker") ||
          (activeStep === 1 && switchTab === "business") ? (
          <>
            <TypedAccountLoginMutation>
              {(userLogin) => {
                function onVerificationSubmit(values, { setErrors }) {
                  // Check if the object values are populated before sending.
                  if (IsNotEmpty(values)) {
                    sendVerifactionCode(
                      values.otpcode.toString(),
                      userLogin,
                      setErrors,
                    );
                  }
                }
                return (
                  <>
                    {/* Using the OTP Form for both seeker and business tabs as the fields are similar. */}
                    <OTPForm
                      loading={loading}
                      switchTabs={switchTabs}
                      initialValues={otpCodeValue}
                      onSubmit={onVerificationSubmit}
                      onSignInSubmit={onSignInSubmit}
                      alert={alert}
                      resendRequest={resendRequest}
                    />
                  </>
                );
              }}
            </TypedAccountLoginMutation>
            <div id="sign-in-button"></div>
          </>
        ) : (
          <div className="register">
            <div
              className="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800"
              style={{ maxWidth: 500 }}
            >
              <div className="w-full mb-10">
                <div className="text-3xl text-indigo-500 text-left leading-tight h-3">
                  “
                </div>
                <p className="text-sm text-gray-600 text-center px-5">
                  The leaders of tomorrow are here. It's about time the youth
                  came together to address youth-related challenges starting
                  with the complex issue of unemployment.
                </p>
                <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">
                  ”
                </div>
              </div>
              <div className="w-full">
                <p className="text-md text-indigo-500 font-bold text-center">
                  Mark Thumi
                </p>
                <p className="text-md text-indigo-500 font-bold text-center">
                  CEO - The Database
                </p>
                <p className="text-xs text-gray-500 text-center">@mark_thumi</p>
              </div>
            </div>
            <p className="text-md text-blue-600 font-bold text-center m-4">
              Register as
            </p>

            <div style={{ display: "flex", margin: "5px" }}>
              <Button
                style={{ margin: "0 5px", width: "100%" }}
                title={`Job Seeker`}
                onClick={() => switchTabs("seeker")}
              />

              <Button
                style={{ margin: "0 5px", width: "100%" }}
                title={`Employer`}
                onClick={() => switchTabs("business")}
              />
            </div>
          </div>
        );
      }}
    </TypedAccountRegistrationMutation>
  );
};

export default Register;
