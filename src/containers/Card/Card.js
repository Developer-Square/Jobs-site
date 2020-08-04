import React from "react";
import { Title, Description, StyledContainer, StyledPhoto } from "./Card.style";

const Card = ({ title, description }) => (
  <StyledContainer style={{ color: "#000000" }}>
    <StyledPhoto src="https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
    <br />
    <Title>{title}</Title>
    <br />
    <Description>{description}</Description>
  </StyledContainer>
);

export default Card;
