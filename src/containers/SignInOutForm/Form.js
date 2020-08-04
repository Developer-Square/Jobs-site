import React, { useContext } from "react";
import SignInForm from "./SignIn";
import SignOutForm from "./SignUp";
import ForgotPassForm from "./ForgotPass";
import { AuthContext } from "contexts/auth/auth.context";
import EmailConfirmationModal from "./emailConfirmation";
import LoginSuccessModal from "./loginConfirmation";

export default function AuthenticationForm() {
  const { authState } = useContext(AuthContext);
  let RenderForm;

  if (authState.currentForm === "signIn") {
    RenderForm = SignInForm;
  }

  if (authState.currentForm === "signUp") {
    RenderForm = SignOutForm;
  }

  if (authState.currentForm === "forgotPass") {
    RenderForm = ForgotPassForm;
  }
  if (authState.currentForm === "emailConfirm") {
    RenderForm = EmailConfirmationModal;
  }
  if (authState.currentForm === "loginSuccess") {
    RenderForm = LoginSuccessModal;
  }

  return <RenderForm />;
}
