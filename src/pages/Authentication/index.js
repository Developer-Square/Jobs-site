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

  // // Swithches to the next form or previous form
  // const getStepContent = (step) => {
  //   switch (step) {
  //     case 0:
  //       return '';
  //     case 1:
  //       return 'What is an ad group anyways?';
  //     case 2:
  //       return 'This is the bit I really care about!';
  //     default:
  //       return 'Unknown step';
  //   }
  // }

  // Provides the step header for each step i.e. the first one is SignUp.
  const steps = ['Account Type', 'Sign Up', 'OTP Verification', 'Complete Registration'];

  let RenderForm;

  if (authState.currentForm === "signIn") {
    RenderForm = Login;
  }

  if (authState.currentForm === "signUp") {
    RenderForm = Register;
    // RenderForm = <Register  />;
  }
  if (authState.currentForm === "forgotPass") {
    RenderForm = PasswordResetEmail;
  }

  
 

  // if (authState.currentForm === "emailConfirm") {
  //   RenderForm = EmailConfirmationModal;
  // }
  // if (authState.currentForm === "loginSuccess") {
  //   RenderForm = LoginSuccessModal;
  // }

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
          <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

          <TabsContainer>
            <div className="tab-content">
              <RenderForm activeStep={activeStep} setActiveStep={setActiveStep} />
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
