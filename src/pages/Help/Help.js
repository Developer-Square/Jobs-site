import React from "react";
import { Heading, HelpPageWrapper, HelpPageContainer } from "./Help.style";
import Accordion from "components/Accordion/Accordion";
import FooterContainer from "containers/Footer/Footer";
const accor = [
  {
    id: 1,
    title: "faq No1 ",
    details: "faq No1 Desc",
    values: { number1: 7, number2: 2 },
  },
  {
    id: 2,
    title: "faq No2 ",
    details: "faq No2 Desc",
  },
  {
    id: 3,
    title: "faq No3 ",
    details: "faq No3 Desc",
  },
  {
    id: 4,
    title: "faq No4 ",
    details: "faq No4 Desc",
  },
];
function Help() {
  return (
    <HelpPageWrapper>
      <HelpPageContainer>
        <Heading>F.A.Q</Heading>
        <Accordion items={accor} />
      </HelpPageContainer>
      <FooterContainer />
    </HelpPageWrapper>
  );
}
export default Help;
