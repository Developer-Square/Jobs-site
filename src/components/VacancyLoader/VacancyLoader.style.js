import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const NoResult = styled.div`
  width: 100%;
  padding: 100px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${themeGet("fontFamily.0", "sans-serif")};
  font-size: ${themeGet("fontSizes.4", "21")}px;
  font-weight: ${themeGet("fontWeights.6", "700")};
  color: ${themeGet("colors.darkBold", "#6c3a1f")};
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

export const LoaderItem = styled.div`
  width: 25%;
  padding: 0 15px;
  margin-bottom: 30px;
`;
