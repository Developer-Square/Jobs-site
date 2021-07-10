import React from "react";
import { useAlert } from "react-alert";

import { maybe } from "core/utils";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { useHistory, useRouteMatch } from "react-router-dom";
import {OTPForm, FurtherInformation, SignUp, Billing} from './SeekerRegistrationSteps'
import {Bio} from './BusinessRegistrationSteps'


import { TypedAccountRegistrationMutation } from "./mutations";


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

const Register = ({activeStep, setActiveStep, switchTab, setSwitchTab}) => {
  const alert = useAlert();
  const history = useHistory();
  const match = useRouteMatch();
  const [checked, setChecked] = React.useState(false)

  // const initialValues = {
  //   phonenumber: "",
  //   fullname: "",
  //   password: "",
  // }

  const initialValues = {
    fullname: 'Ryan test',
    email: 'ryantest@gmail.com',
    phonenumber: '254796867328',
    password: 'ryantest1',
    otpcode: '333333',
    school: {value: 'AFRICAN NAZARENE', label: 'African Nazarene'},
    interests: {value: 'COMPUTER SCIENCE', label: 'Computer Science'},
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

    // eslint-disable-next-line
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

  // Changes the value in the checkbox
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <TypedAccountRegistrationMutation
      onCompleted={(data) => showSuccessNotification(data, alert)}
    >
      {(registerUser, { loading }) => {
        function onSubmit(values, { setErrors }) {
          switchTabs('', 'forward');

          // registerUser({
          //   variables: values,
          // }).then(({ data }) => {
          //   if (data.register.success) {
          //     console.log("data received", data);
          //     history.push("/auth/activate");
          //   } else {
          //     // setErrors(normalizeErrors(data.register.errors));
          //     setErrors(normalizeErrors(maybe(() => data.register.errors, [])));
          //   }
          // });
        }
        // eslint-disable-next-line
        return activeStep === 0 && switchTab === 'seeker' || activeStep === 0 && switchTab === 'business' ? (
          // Using the SignUp Form for both seeker and business tabs as the fields are similar.
          <SignUp initialValues={initialValues} onSubmit={onSubmit} setSwitchTab={setSwitchTab} checked={checked} handleChange={handleChange} loading={loading} history={history} />
        // eslint-disable-next-line
        ) : activeStep === 1 && switchTab === 'seeker' || activeStep === 1 && switchTab === 'business' ? (
          // Using the OTP Form for both seeker and business tabs as the fields are similar.
          <OTPForm loading={loading} switchTabs={switchTabs} initialValues={initialValues} onSubmit={onSubmit} />
        ) : activeStep === 2 && switchTab === 'seeker' ? (
          <FurtherInformation schoolOptions={schoolOptions} interests={interests} loading={loading} switchTabs={switchTabs} onSubmit={onSubmit} initialValues={initialValues} />
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
