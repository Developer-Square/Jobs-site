import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  Input,
  Divider,
  LinkButton,
} from "./SignInOutForm.style";
import { Facebook, Google } from "components/AllSvgIcon";
import { AuthContext } from "contexts/auth/auth.context";
import { TERMS_CONDITIONS } from "constants/routes.constants";
import { closeModal } from "@redq/reuse-modal";

export default function SignOutModal() {
  const { authDispatch } = useContext(AuthContext);
  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };

  return (
    <Wrapper>
      <Container>
        <Heading>Sign Up</Heading>

        <SubHeading>Every fill is required in sign up</SubHeading>

        <Input type="text" placeholder={`Email Address or Contact No.`} />

        <Input type="email" placeholder={`Password (min 6 characters)`} />

        <HelperText style={{ padding: "20px 0 30px" }}>
          By signing up, you agree to The Database's{" "}
          <Link to={TERMS_CONDITIONS}>
            <p onClick={() => closeModal()}>Terms &amp; Condtions</p>
          </Link>
        </HelperText>

        <Button
          fullwidth
          title={"Continue"}
          intlButtonId="continueBtn"
          style={{ color: "#ffffff" }}
        />

        <Divider>
          <span>or</span>
        </Divider>

        <Button
          fullwidth
          title={"Continue with Facebook"}
          iconPosition="left"
          className="facebook"
          icon={<Facebook />}
          iconStyle={{ color: "#ffffff", marginRight: 5 }}
          style={{ color: "#ffffff" }}
        />

        <Button
          fullwidth
          title={"Continue with Google"}
          className="google"
          iconPosition="left"
          icon={<Google />}
          iconStyle={{ color: "#ffffff", marginRight: 5 }}
          style={{ color: "#ffffff" }}
        />
        <Offer style={{ padding: "20px 0" }}>
          Already have an account?{" "}
          <LinkButton onClick={toggleSignInForm}>Login"</LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
