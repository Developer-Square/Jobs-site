import React from "react";
import {
  FooterWrapper,
  TopSection,
  MiddleSection,
  BottomSection,
  Container,
} from "./Footer.style";

function Footer() {
  return (
    <FooterWrapper>
      <TopSection>
        <Container></Container>
      </TopSection>
      <MiddleSection>
        <Container></Container>
      </MiddleSection>
      <BottomSection>
        <Container></Container>
      </BottomSection>
    </FooterWrapper>
  );
}

export default Footer;
