import React from "react";
import { useAlert } from "react-alert";
import firebase from "firebase";

import Button from "components/Button/Button";
import { showSuccessNotification } from "helpers";
import { useHistory, useRouteMatch } from "react-router-dom";
import {OTPForm, FurtherInformation, SignUp, Billing} from './SeekerRegistrationSteps'
import {Bio} from './BusinessRegistrationSteps'


import { TypedAccountRegistrationMutation } from "./mutations";

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
    username: 'Ryan test22',
    email: 'ryantest22@gmail.com',
    phone: '254745613316',
    password1: 'Passwor1',
    password2: 'Passwor1',
    isEmployer,
    isSeeker,
    isInstitution,
    terms: false
  }

  const otpCodeValue = {
    otpcode: '',
  }

  const schoolInterestsInitialValues = {
    school: '',
    interests: [{value: 'COMPUTER SCIENCE', label: 'Computer Science'}],
    course: '',
  }

  const bioInitialValues = {
    company: 'Andela LLC',
    location: 'Nairobi, Kenya',
    industries: {value: 'PETROLEUM Industry', label: 'Petroleum Industry'}
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
  // Returns true if every item in the object returned by the
  // Object.values has an item length of more than one
  // First remove the boolean values.
  const IsNotEmpty = value => {
    return Object.values(value).filter(item => typeof item !== 'boolean' && typeof item !==  'number').every(item => item.length > 0)
  }

  // Prepare data for sending i.e. add the '+' to international phonenumbers.
  const prepareData = (data) => {
    // Remove the terms and conditions value as it is not needed
    // in the api request.
    delete data.terms;
    Object.keys(data).map(key => {
      // Attach the '+' to the beginning of the phone number
      // if its not there already.
      if (key === 'phone') {
        if (!data['phone'].includes('+')) {
          data['phone'] = '+' + data['phone'];
        }
      }

      // Remove the space from the full name value.
      if (key === 'username') {
        data['username'] = data['username'].replace(/ /g, "")
      }
      return null;
    })
    return data;
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

  const sendVerifactionCode = (code) => {
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
    //     localStorage.setItem('registerValues', sentData);
    //     switchTabs('', 'forward');
    //   } else {
    //     setErrors(normalizeErrors(maybe(() => data.register.errors, [])));
    //   }
    // })
  }

  return (
    <TypedAccountRegistrationMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(registerUser, { loading }) => {
        function onSubmit(values, { setErrors }) {
          // Check if the object values are populated before sending.
          if (IsNotEmpty(values)) {
            // Check if we're on the first step of the registration form.
            if (values.hasOwnProperty('email')) {
              registerUserFn(registerUser,values, setErrors)
            }
            // Check if we're on the second step of the registration form.
            else if (values.hasOwnProperty('otpcode')) {
              sendVerifactionCode(values.otpcode.toString());
            }
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
            {/* Using the OTP Form for both seeker and business tabs as the fields are similar. */}
            <OTPForm loading={loading} switchTabs={switchTabs} initialValues={otpCodeValue} onSubmit={onSubmit} onSignInSubmit={onSignInSubmit} alert={alert} resendRequest={resendRequest} />
            <div id="sign-in-button"></div>
          </>
        ) : activeStep === 2 && switchTab === 'seeker' ? (
          <FurtherInformation schoolOptions={schoolOptions} interests={interests} loading={loading} switchTabs={switchTabs} onSubmit={onSubmit} initialValues={schoolInterestsInitialValues} />
        ) : activeStep === 2 && switchTab === 'business' ? (
          <Bio initialValues={bioInitialValues} industries={industries} loading={loading} switchTabs={switchTabs} onSubmit={onSubmit} />
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
