import React from "react";
import { useAlert } from "react-alert";
import { Form, Formik } from "formik";
import styled from "styled-components";

import FormikControl from "containers/FormikContainer/FormikControl";
import { maybe } from "core/utils";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import {SeekerProfileDetails, SeekerSignUp} from './RegistrationSteps'


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

const Register = ({activeStep, setActiveStep}) => {
  const alert = useAlert();
  const history = useHistory();
  const match = useRouteMatch();
  const [isSeeker, setIsSeeker] = React.useState(false);
  const [isEmployer, setIsEmployer] = React.useState(false);
  const [isInstitution, setIsInstitution] = React.useState(false);
  const [switchTab, setSwitchTab] = React.useState('');
  const [checked, setChecked] = React.useState(false)


  React.useEffect(() => {
    if (match.params) {
      setSwitchTab(match.params.userType);
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
      setSwitchTab('');
    }
    // eslint-disable-next-line
  }, [match.params.userType]);

  const initialValues = {
    username: "",
    email: "",
    isSeeker: isSeeker,
    isEmployer: isEmployer,
    isInstitution: isInstitution,
    password1: "",
    password2: "",
  }

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ];
  const statusOptions = [
    { value: "OPEN", label: "Open to offers" },
    { value: "BUSY", label: "Busy" },
    { value: "LOOKING", label: "Actively looking" },
  ];

  // Switches between different steps i.e. from step 1 to step 2
  const switchTabs = (type, direction) => {
    if (direction === 'forward') {
      setActiveStep(currStep => currStep + 1)
    } else {
      setActiveStep(currStep => currStep - 1)
    }

    if (type === 'seeker') {
      history.push(`/auth/p/seeker`)
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
        return activeStep === 0 ? (
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
                onClick={() => switchTabs('seeker', 'forward')}
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
        ) : activeStep === 1 ? (
          <SeekerSignUp initialValues={initialValues} onSubmit={onSubmit} switchTabs={switchTabs} checked={checked} handleChange={handleChange} loading={loading} history={history} />
          // Add registration for organization
        ) : activeStep === 2 ? (
          <Formik>
            {(formik) => {
              return (
                <Form>
                  <Spacer>
                    <Link to={"/auth"} onClick={() => switchTabs('', 'back')}>{`<`} Select Different Option </Link>
                  </Spacer>
                  <FormikControl
                    control="input"
                    type="number"
                    label="OTP Code"
                    name="otpcode"
                    icon="ln ln-icon-Lock-2"
                  />

                  <Button
                    type="submit"
                    // disabled={!formik.isValid}
                    fullwidth
                    loading={loading}
                    title={loading ? "Verifying ... " : "Verify"}
                    onClick={() => switchTabs('', 'forward')}
                  />
                </Form>
              )
            }}
          </Formik>
        ) : activeStep === 3 ? (
          <SeekerProfileDetails switchTabs={switchTabs} statusOptions={statusOptions} genderOptions={genderOptions} loading={loading} industries={[]}/>
        ) : null;
      }}
    </TypedAccountRegistrationMutation>
  );
};

const Spacer = styled.div`
  margin: 15px 0;
`

export default Register;
