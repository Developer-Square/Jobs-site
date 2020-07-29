import React, { useContext, useState } from "react";
import {
  LinkButton,
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  Input,
  Divider,
} from "./SignInOutForm.style";
import { Facebook, Google } from "components/AllSvgIcon";
import { AuthContext } from "contexts/auth/auth.context";
import { closeModal } from "@redq/reuse-modal";

export default function SignInModal() {
  const { authDispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSignUpForm = () => {
    authDispatch({
      type: "SIGNUP",
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: "FORGOTPASS",
    });
  };

  const loginCallback = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", `${email}.${password}`);
      authDispatch({ type: "SIGNIN_SUCCESS" });
      closeModal();
    }
  };

  return (
    <Wrapper>
      <Container>
        <Heading>Welcome Back</Heading>

        <SubHeading>Login with your email &amp; password</SubHeading>
        <form onSubmit={loginCallback}>
          <Input
            type="email"
            placeholder={`Email Address.`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder={`Password (min 6 characters)`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            fullwidth
            title={"Continue"}
            type="submit"
            style={{ color: "#ffffff" }}
          />
        </form>
        <Divider>
          <span>or</span>
        </Divider>

        <Button
          fullwidth
          title={"Continue with Facebook"}
          className="facebook"
          icon={<Facebook />}
          iconPosition="left"
          iconStyle={{ color: "#ffffff", marginRight: 5 }}
          onClick={loginCallback}
          style={{ color: "#ffffff" }}
        />

        <Button
          fullwidth
          title={"Continue with Google"}
          className="google"
          icon={<Google />}
          iconPosition="left"
          iconStyle={{ color: "#ffffff", marginRight: 5 }}
          onClick={loginCallback}
          style={{ color: "#ffffff" }}
        />

        <Offer style={{ padding: "20px 0" }}>
          Don't have any account?{" "}
          <LinkButton onClick={toggleSignUpForm}>Sign Up</LinkButton>
        </Offer>
      </Container>

      <OfferSection>
        <Offer>
          Forgot your password?{" "}
          <LinkButton onClick={toggleForgotPassForm}>Reset It</LinkButton>
        </Offer>
      </OfferSection>
    </Wrapper>
  );
}
