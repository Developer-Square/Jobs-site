import React from "react";
import { LeftMenuBox } from "./LeftMenu.style";
import { Link } from "react-router-dom";
import Logoimage from "image/db.png";
import styled from "styled-components";

export const Logo = styled.div`
  margin-right: auto;

  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;
export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 50px;
`;
export const LeftMenu = ({ logo }) => {
  // const history = useHistory();
  return (
    <LeftMenuBox>
      <Logo>
        <Link to="/">
          <LogoImage src={Logoimage} alt="TheDB" />
        </Link>
      </Logo>
    </LeftMenuBox>
  );
};
