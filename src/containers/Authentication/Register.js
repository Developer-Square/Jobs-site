import React from "react";
import { useAlert } from "react-alert";
import firebase from "firebase";

import Button from "components/Button/Button";
import { showSuccessNotification, normalizeErrors, showNotification, IsNotEmpty, prepareData } from "helpers";
import { useHistory, useRouteMatch } from "react-router-dom";
import {OTPForm, FurtherInformation, SignUp, Billing} from './SeekerRegistrationSteps'
import {Bio} from './BusinessRegistrationSteps'
import { TypedAccountRegistrationMutation, TypedAccountLoginMutation, TypedSeekerProfileMutation, TypedEmployerProfileMutation } from "./mutations";
import { maybe } from "misc";
import { storeLoginDetails } from "utils";
import { showSeekerProfileNotification } from "utils";

const Register = ({activeStep, setActiveStep, switchTab, setSwitchTab}) => {
  const alert = useAlert();
  const history = useHistory();
  const match = useRouteMatch();
  const [isSeeker, setIsSeeker] = React.useState(false);
  const [isEmployer, setIsEmplolyer] = React.useState(false);
  const [isInstitution] = React.useState(false);
  const [firebaseResult, setFirebaseResult] = React.useState('');
  const [resendRequest, setResendRequest] = React.useState(false);

  const initialValues = {
    username: 'Ryan test37',
    email: 'ryantest37@gmail.com',
    phone: '254745613319',
    password1: 'Passwor1',
    password2: 'Passwor1',
    isEmployer,
    isSeeker,
    isInstitution,
    terms: false
  }

  const otpCodeValue = {
    otpcode: '696969',
  }

  const schoolInterestsInitialValues = {
    school: '',
    interests: [{value: 'COMPUTER SCIENCE', label: 'Computer Science'}],
    course: '',
  }

  const bioInitialValues = {
    company: 'Andela LLC',
    location: 'Nairobi, Kenya',
    industries: [{value: 'PETROLEUM Industry', label: 'Petroleum Industry'}]
  }

  const schoolOptions = [ 
    { value: "AFRICAN NAZARENE", label: "African Nazarene" },
    { value: "STRATHMORE UNIVERSITY", label: "Strathmore University" }
  ]

  const interests = [
    { value: "CODING", label: "Coding" },
    { value: "GRAPHIC DESIGN", label: "Graphic Design" },
    { value: "ONLINE WRITING", label: "Online Writing" },
    { value: "CATERING", label: "Catering" },
  ]

  const industries = [
    { value: "CODING", label: "Coding" },
    { value: "GRAPHIC DESIGN", label: "Graphic Design" },
    { value: "ONLINE WRITING", label: "Online Writing" },
    { value: "CATERING", label: "Catering" },
  ]

  React.useEffect(() => {
    if (match.params) {
      if (match.params.userType === 'seeker') {
        setIsSeeker(currSeeker => currSeeker = true);
      } else if (match.params.userType === 'business') {
        setIsEmplolyer(currEmployer => currEmployer = true);
      }
    }    // eslint-disable-next-line
  }, [match.params.userType, switchTab, initialValues]);


  // Switches between different steps i.e. from step 1 to step 2
  const switchTabs = (type, direction) => {
    if (direction === 'forward') {
      setActiveStep(currStep => currStep + 1)
    } else if (direction === 'back') {
      setActiveStep(currStep => currStep - 1)
    }

    if (type === 'seeker') {
      history.push(`/auth/p/seeker`)
      setSwitchTab(type);
    } else if (type === 'business') {
      history.push('/auth/p/business')
      setSwitchTab(type)
    }
  }

  const onSignInSubmit = (phone, resend) => {
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phone, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      setFirebaseResult(confirmationResult);
      // Set setResendRequest to true so that we can know the function resolved in the resendSms
      // function. resendSms() is in the OTPForm. 
      if (resend) {
        setResendRequest(true)  
      }
    }).catch((error) => {
      // Error; SMS not sent
      showSuccessNotification('firebase', alert, error);
    });
  }

  // Send the phone number to firebase for otp verification.
  const triggerFirebaseSignIn = (phone) => {
    // First hide the reCAPTCHA then submit the phone number.
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
    });
    onSignInSubmit(phone);
  };

  const sendVerifactionCode = (code, userLogin, setErrors) => {
    firebaseResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      // If the object has values then proceed.
      if (Object.values(user).length > 0) {
        alert.show(
          {
            title: 'Phone number verified successfully',
          },
          { type: 'success', timeout: 5000 },
        );

        // When the verification is successfull, login the user.
        let values = localStorage.getItem('registerValues');
        values = JSON.parse(values);

        userLogin({
          variables: {
            email: values.email,
            password: values.password1
          }
        }).then(({data}) => {
          console.log(data)
          const successful = maybe(() => data.tokenAuth.success);
          storeLoginDetails(successful, '', data, setErrors);
        })

        switchTabs('', 'forward')
      }
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      showSuccessNotification('firebase', alert, error);
    });
  }

  // Send the user's details to the api.
  const registerUserFn = async (registerUser, values, setErrors) => {
    const sentData = await prepareData(values);
    localStorage.setItem('registerValues', JSON.stringify(sentData));
    triggerFirebaseSignIn(sentData.phone);
    switchTabs('', 'forward');

    // registerUser({
    //   variables: sentData,
    // }).then(({ data }) => {

    //   if (data.register.success) {
    //     triggerFirebaseSignIn(sentData.phone);
    //     localStorage.setItem('registerValues', JSON.stringify(sentData));
    //     switchTabs('', 'forward');
    //   } else {
    //     setErrors(normalizeErrors(maybe(() => data.register.errors, [])));
    //   }
    // })
  }

  const seekerProfileCreate = (values, seekerCreate, setErrors) => {
    // const interests = values.interests.reduce((arr, b) => {
    //   arr.push(b.value);
    //   return arr;
    // }, []);
    // send empty array now for testing purposes
    const interests = ['SW5kdXN0cnk6Mg=='].toString();
    console.log(values);
    seekerCreate({
        variables: {
          ...values,
        institution: values.school.value,
        industries: interests
      }
    }).then(({ data }) => {
      if (data) {
        if (data.seekerCreate) {
          switchTabs('', 'forward');

          if (!data.seekerCreate.success) {
            setErrors(
              normalizeErrors(maybe(() => data.seekerCreate.errors, [])),
            );
          }
        }
      }
    });
  }

  const employerProfileCreate = (values, employerCreate, setErrors) => {
    let country;
    const data = values.location.split(',');

    // Check if the user provided a county as the second arguement.
    if (data[1]) {
      // Perform a slice to get rid of the whitespace infront of the 
      // country string.
      country = data[1].slice(1);
    } else {
      country = data[0]
    }

    const industries = ['SW5kdXN0cnk6Mg=='].toString();
    employerCreate({
        variables: {
          ...values,
          country,
          industries, 
          name: values.company,
        }
    }).then(({ data }) => {
      if (data) {
        if (data.employerCreate) {
          switchTabs('', 'forward');

          if (!data.employerCreate.success) {
            setErrors(
              normalizeErrors(maybe(() => data.employerCreate.errors, [])),
            );
          }
        }
      }
    });
  }

  return (
    <TypedAccountRegistrationMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(registerUser, { loading }) => {
        function onSubmit(values, { setErrors }) {
          // Check if the object values are populated before sending.
          if (IsNotEmpty(values)) {
              registerUserFn(registerUser,values, setErrors)
          }
        }
        // eslint-disable-next-line
        return activeStep === 0 && switchTab === 'seeker' || activeStep === 0 && switchTab === 'business' ? (
          <>
            {/* Using the SignUp Form for both seeker and business tabs as the fields are similar. */}
            <SignUp initialValues={initialValues} onSubmit={onSubmit} setSwitchTab={setSwitchTab} loading={loading} history={history} />
            <div id="sign-in-button"></div>
          </>
        // eslint-disable-next-line
        ) : activeStep === 1 && switchTab === 'seeker' || activeStep === 1 && switchTab === 'business' ? (
          <>
            <TypedAccountLoginMutation>
              {userLogin => {
                function onVerificationSubmit(values, { setErrors }) {
                  // Check if the object values are populated before sending.
                  if (IsNotEmpty(values)) {
                    sendVerifactionCode(values.otpcode.toString(), userLogin, setErrors);
                  }
                }
                return(
                  <>
                    {/* Using the OTP Form for both seeker and business tabs as the fields are similar. */}
                    <OTPForm loading={loading} switchTabs={switchTabs} initialValues={otpCodeValue} onSubmit={onVerificationSubmit} onSignInSubmit={onSignInSubmit} alert={alert} resendRequest={resendRequest} />
                  </>
                )
              }}
            </TypedAccountLoginMutation>
            <div id="sign-in-button"></div>
          </>
        ) : activeStep === 2 && switchTab === 'seeker' ? (

          <TypedSeekerProfileMutation onCompleted={(data, errors) => showSeekerProfileNotification(data, errors, alert)} >
            {(seekerCreate, { loading }) => { 
            function onSeekerProfileSubmit(values, { setErrors }) {
              console.log(values)
              if (IsNotEmpty(values)) {
                seekerProfileCreate(values, seekerCreate, setErrors);
              }
            }
            return(
              <FurtherInformation schoolOptions={schoolOptions} interests={interests} loading={loading} switchTabs={switchTabs} onSeekerProfileSubmit={onSeekerProfileSubmit} initialValues={schoolInterestsInitialValues} />
            )}
            }
          </TypedSeekerProfileMutation>

        ) : activeStep === 2 && switchTab === 'business' ? (
          <TypedEmployerProfileMutation
            onCompleted={(data, errors) =>
              showNotification(
                data.employerCreate,
                errors,
                alert,
                "accountErrors",
                "Profile Created",
              )
          }
          >
            {(employerCreate) => {
              function onEmployerProfileSubmit(values, { setErrors }) {
                if (IsNotEmpty(values)) {
                  employerProfileCreate(values, employerCreate, setErrors);
                }
              }
              return (
                <Bio initialValues={bioInitialValues} industries={industries} loading={loading} switchTabs={switchTabs} onEmployerProfileSubmit={onEmployerProfileSubmit} alert={alert} />
              )
            }}
          </TypedEmployerProfileMutation>
        // eslint-disable-next-line
        ) : activeStep === 3 && switchTab === 'seeker' || activeStep === 3 && switchTab === 'business' ? (
          // Using the Billing Form for both seeker and business tabs as the fields are similar.
          <Billing switchTabs={switchTabs} loading={loading} />
        ) : (
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
                onClick={() => switchTabs('seeker')}
              />

              <Button
                style={{ margin: "0 5px", width: "100%" }}
                title={`Business`}
                onClick={() => switchTabs('business')}
              />
            </div>
          </div>
        );
      }}
    </TypedAccountRegistrationMutation>
  );
};

export default Register;
