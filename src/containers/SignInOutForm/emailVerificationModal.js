import React from "react";
import { Wrapper, Container, Heading } from "./SignInOutForm.style";

export default function EmailVerificationModal(text) {
  console.log("text", text);
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        {text ? (
          <Heading>{text}</Heading>
        ) : (
          <Heading>Check your email for Verification</Heading>
        )}
      </Container>
    </Wrapper>
  );
}
