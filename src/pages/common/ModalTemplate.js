import React from "react";

import {
  OfferSection,
  Offer,
  Wrapper,
  Container,
  SubHeading,
  Heading,
} from "../Dashboard/Dashboard.style";
function ModalTemplate(profile) {
  console.log("profileeeee", profile);
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        <Heading>{profile.full_name}</Heading>

        <SubHeading>{profile.email}</SubHeading>
        <OfferSection>
          <Offer>
            <p>{profile.salary}</p>
            <p>{profile.title}</p>
            <p>{profile.location}</p>
            <p>{profile.availability}</p>
          </Offer>
        </OfferSection>
      </Container>
    </Wrapper>
  );
}

export default ModalTemplate;
