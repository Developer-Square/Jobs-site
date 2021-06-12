import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const HelperText = styled.p`
  font-family: "Lato", sans-serif;
  font-size: ${themeGet("fontSizes.1", "13")}px;
  font-weight: ${themeGet("fontWeights.3", "400")};
  color: ${themeGet("colors.darkRegular", "#77798c")};
  margin: 0;
  text-align: center;
  width: 100%;

  a {
    font-weight: 700;
    color: #4285f4;
    text-decoration: underline;
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
