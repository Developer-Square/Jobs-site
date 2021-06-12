/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import Login from "containers/Authentication/Login";
import PasswordResetEmail from "containers/Authentication/PasswordResetEmail";
import Register from "containers/Authentication/Register";
import { AuthContext } from "contexts/auth/auth.context";

const Authentication = () => {
  const { authState, authDispatch } = useContext(AuthContext);
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
          <ul class="tabs-nav">
            <li className={authState.currentForm === "signIn" ? "active" : ""}>
              <a
                onClick={() =>
                  authDispatch({
                    type: "SIGNIN",
                  })
                }
                href
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
                href
              >
                Register
              </a>
            </li>
          </ul>

          <div className="tabs-container">
            <div className="tab-content">
              <RenderForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
