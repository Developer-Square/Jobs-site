/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';

import Login from "containers/Authentication/Login";
import PasswordResetEmail from "containers/Authentication/PasswordResetEmail";
import Register from "containers/Authentication/Register";
import { AuthContext } from "contexts/auth/auth.context";

const Authentication = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [switchTab, setSwitchTab] = React.useState('');



  // Provides the step header for each step i.e. the first one is SignUp.
  const steps = ['Sign Up', 'OTP Verification', 'Further information', 'Billing'];

  let RenderForm;

  if (authState.currentForm === "signIn") {
    RenderForm = Login;
  }

  if (authState.currentForm === "signUp") {
    RenderForm = Register;
  }
  if (authState.currentForm === "forgotPass") {
    RenderForm = PasswordResetEmail;
  }

  return (
    <>
      <div
        id="titlebar"
        className="photo-bg"
        style={{
          backgroundImage: "url(images/all-categories-photo.jpg)",
        }}
      >
        <div className="container">
          <div className="ten columns">
            <h2>Authentication</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="my-account">
          <ul className="tabs-nav">
            <li className={authState.currentForm === "signIn" ? "active" : ""}>
              <a
                onClick={() =>
                  authDispatch({
                    type: "SIGNIN",
                  })
                }
              >
                Login
              </a>
            </li>
            <li className={authState.currentForm === "signUp" ? "active" : ""}>
              <a
                onClick={() =>
                  authDispatch({
                    type: "SIGNUP",
                  })
                }
              >
                Register
              </a>
            </li>
          </ul>
          {/* Hide the stepper header on the signin form and on the first step of
          the sign up form */}
          {authState.currentForm !== "signIn" && switchTab !== '' ? (
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          ): null}

          <TabsContainer>
            <div className="tab-content">
              <RenderForm activeStep={activeStep} switchTab={switchTab} setSwitchTab={setSwitchTab} setActiveStep={setActiveStep} />
            </div>
          </TabsContainer>
        </div>
      </div>
    </>
  );
};

const TabsContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 700px;
`

export default Authentication;
