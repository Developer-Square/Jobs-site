import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const CardWrapper = styled.div`
  margin: 30px 0 0 0;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  background: #fff;
  padding: 0;
  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    padding: 15px 30px;
    color: #333;
    background-color: #fff;
    display: block;
    border-bottom: 1px solid #eaeaea;
    border-radius: 4px 4px 0 0;
  }

  @media (min-width: 710px) {
    padding: 25px 40px;
  }
  @media (max-width: 710px) {
    padding: 0;
  }
`;

export const FormWrapper = styled.div`
  margin: 0;
  padding: 0;
  color: #333;
  display: block;
  div {
    margin: 0 20px;
    @media (max-width: 710px) {
      margin: 0;
    }
  }
`;

export const Wrapper = styled.div`
  text-align: center;
  background-color: #ffffff;
`;

export const Container = styled.div`
  padding: 40px 60px 0;

  @media (max-width: 768px) {
    padding: 40px 30px 0;
  }
`;

export const Heading = styled.h3`
  color: ${themeGet("colors.primary", "#6c3a1f")};
  margin-bottom: 10px;
  font-family: "Playfair Display", sans-serif;
  font-size: ${themeGet("fontSizes.4", "21")}px;
  font-weight: ${themeGet("fontWeights.6", "700")};
`;

export const SubHeading = styled.span`
  margin-bottom: 30px;
  font-family: "Lato", sans-serif;
  font-size: ${themeGet("fontSizes.2", "15")}px;
  font-weight: ${themeGet("fontWeights.3", "400")};
  color: ${themeGet("colors.darkRegular", "#77798c")};
  display: block;
`;
