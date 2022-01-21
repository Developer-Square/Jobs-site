import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const BannerWrapper = styled.div`
  width: 100%;
  min-height: 67vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  // background-size: 100%;
  // background-position: bottom center;
  background-repeat: no-repeat;
  background-color: #f7f7f7;
  background-size: cover;

  @media (max-width: 1400px) {
    min-height: 67vh;
  }

  @media (max-width: 1200px) {
    min-height: 67vh;
  }

  @media (max-width: 1050px) {
    min-height: 50vh;
  }

  @media (max-width: 990px) {
    min-height: 260px;
    height: 67vh;
    padding-top: 50px;
  }

  @media (max-width: 767px) {
    min-height: 160px;
    height: 67vh;
    padding-top: 45px;
  }
`;

const BannerComponent = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .banner-search {
    @media (max-width: 990px) {
      display: none;
    }
  }
`;

const BannerHeading = styled("h1")`
  font-family: ${themeGet("fontFamily.1", "sans-serif")};
  font-size: ${themeGet("fontSizes.7", "60")}px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 15px;
  text-align: center;

  @media (max-width: 1400px) {
    font-size: ${themeGet("fontSizes.7", "60")}px;
  }
  @media (max-width: 990px) {
    font-size: ${themeGet("fontSizes.6", "45")}px;
  }
  @media (max-width: 767px) {
    font-size: 30px;
  }
`;

const BannerSubHeading1 = styled("h3")`
  font-family: ${themeGet("fontFamily.1", "sans-serif")};
  font-size: ${themeGet("fontSizes.5", "30")}px;
  font-weight: 500;
  font-style: italic;
  color: #fff;
  margin-bottom: 15px;
  text-align: center;

  @media (max-width: 1400px) {
    font-size: ${themeGet("fontSizes.5", "30")}px;
  }
  @media (max-width: 990px) {
    font-size: ${themeGet("fontSizes.5", "30")}px;
  }
  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

const BannerSubHeading = styled("span")`
  font-family: ${themeGet("fontFamily.0", "sans-serif")};
  font-size: ${themeGet("fontSizes.3", "19")}px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 1400px) {
    font-size: ${themeGet("fontSizes.2", "21")}px;
  }
  @media (max-width: 990px) {
    display: none;
  }
`;

export {
  BannerWrapper,
  BannerHeading,
  BannerSubHeading,
  BannerSubHeading1,
  BannerComponent,
};
