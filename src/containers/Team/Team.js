import React from "react";
import { Title, Review, StyledContainer, StyledPhoto } from "./Team.style";

const Team = ({ title, review }) => (
  <StyledContainer style={{ color: "#000000" }}>
    <StyledPhoto src="https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/blog-post-01-498x315.jpg" />
    <br />
    <Title>{title}</Title>
    <br />
    <Review>{review}</Review>
  </StyledContainer>
);

export default Team;
