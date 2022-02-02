/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import styled from "styled-components";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Login from "containers/Authentication/Login";
import PasswordResetEmail from "containers/Authentication/PasswordResetEmail";
import Register from "containers/Authentication/Register";
import { AuthContext } from "contexts/auth/auth.context";
import bgImg from "image/12.jpg";
import UserContext from "contexts/user/user.provider";

const Authentication = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [switchTab, setSwitchTab] = React.useState("");
  const { userType } = React.useContext(UserContext);

  // Provides the step header for each step i.e. the first one is SignUp.
  const steps = ["Sign Up", "Verify", "About You"];

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
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#f7f7f7",
        backgroundImage: `linear-gradient(to right, rgb(33 39 127 / 0.72), rgb(33 39 127 / 0.72)),url(${bgImg})`,
      }}
    >
      <div className=" my-account p-0 m-0">
        <div className="bg-gray-100 shadow-md p-8 rounded-xl w-50 min-h-md items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800  items-center justify-center">
              Welcome {authState.currentForm === "signIn" && `Back`}
            </div>
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800  items-center justify-center">
              {userType === "Employer" && "It's time to find your Dream Team"}
              {userType === "Seeker" && "It's time to find your Dream Job"}
            </div>
          </div>
          <div className="items-center justify-center">
            {/* Hide the stepper header on the signin form and on the first step of
          the sign up form */}
            {authState.currentForm !== "signIn" && switchTab !== "" ? (
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            ) : null}

            <TabsContainer>
              <div className="tab-content">
                <RenderForm
                  activeStep={activeStep}
                  switchTab={switchTab}
                  setSwitchTab={setSwitchTab}
                  setActiveStep={setActiveStep}
                />
              </div>
            </TabsContainer>
            <div className="flex justify-center items-center mt-6">
              <a
                href="#"
                target="_blank"
                className="inline-flex items-center text-gray-700 font-medium text-xs text-center"
              >
                <span className="ml-2">
                  {authState.currentForm === "signIn"
                    ? `You don't have an account?`
                    : `Already have an account?`}
                </span>
              </a>
              <a
                onClick={() =>
                  authDispatch({
                    type:
                      authState.currentForm === "signIn" ? "SIGNUP" : "SIGNIN",
                  })
                }
                className="text-xs ml-2 text-blue-500 font-semibold"
              >
                {authState.currentForm === "signIn"
                  ? "Register Now"
                  : "Sign In"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabsContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 700px;
`;

export default Authentication;
