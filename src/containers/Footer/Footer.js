import React from "react";
import {
  FooterWrapper,
  TopSection,
  MiddleSection,
  BottomSection,
  Container,
  FooterContainer,
  TopLeft,
  TopRight,
  Row,
  Column,
  TopLeftWrapper,
  TopRightWrapper,
} from "./Footer.style";
import LogoImage from "image/logo.svg";
import Logo from "components/Logo/Logo";
import { useHistory } from "react-router-dom";
import { EllipsisIcon } from "components/AllSvgIcon";

function Footer() {
  const history = useHistory();
  return (
    <FooterWrapper>
      <TopSection>
        <Container>
          <Row>
            <Column>
              <FooterContainer>
                <TopLeft>
                  <TopLeftWrapper>
                    <Logo
                      imageUrl={LogoImage}
                      alt={"TheDatabase Logo"}
                      onClick={() => history.push("/")}
                    />
                  </TopLeftWrapper>
                </TopLeft>
                <TopRight>
                  <TopRightWrapper>
                    <div>
                      <ul>
                        <li>
                          <EllipsisIcon />
                          <strong>1124</strong>
                          <span>Job Listings</span>
                        </li>
                      </ul>
                    </div>
                  </TopRightWrapper>
                  <TopRightWrapper>
                    <div>
                      <ul>
                        <li>
                          <EllipsisIcon />
                          <strong>110</strong>
                          <span>Gig Listings</span>
                        </li>
                      </ul>
                    </div>
                  </TopRightWrapper>
                </TopRight>
              </FooterContainer>
            </Column>
          </Row>
        </Container>
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
