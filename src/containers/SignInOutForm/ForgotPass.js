import React, { useContext } from "react";
import {
  Wrapper,
  Container,
  Heading,
  SubHeading,
  Input,
  Button,
  LinkButton,
  Offer,
} from "./SignInOutForm.style";
import { AuthContext } from "contexts/auth/auth.context";

export default function ForgotPassModal() {
  const { authDispatch } = useContext(AuthContext);
  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        <Heading>Forgot Password</Heading>

        <SubHeading>We'll send you a link to reset your password"</SubHeading>

        <Input type="text" placeholder={`Email Address or Contact No.`} />

        <Button
          fullwidth
          title={"Reset Password"}
          style={{ color: "#ffffff" }}
        />
        <Offer style={{ padding: "20px 0 0" }}>
          Back to" <LinkButton onClick={toggleSignInForm}>Login</LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
