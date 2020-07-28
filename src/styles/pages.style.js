import styled from "styled-components";
import { Link } from "react-router-dom";

export const MobileCarouselDropdown = styled.div`
  @media (min-width: 990px) {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 767px) {
    width: 100%;
    padding: 0 15px;
  }

  @media only screen and (max-width: 1289px) and (min-width: 960px) {
    position: relative;
    width: 960px;
    margin: 0 auto;
    padding: 0;
  }
  @media only screen and (max-width: 990px) and (min-width: 768px) {
    width: 768px;
  }
`;

const RowWrapper = styled.div`
  margin-top: 55px !important;
  margin-left: -15px;
  margin-right: -15px;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  &:before {
    content: " ";
    display: table;
  }
`;
const Center = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 20px);
  left: -10px;
  position: relative;
  align-items: center;
`;
const CategoryBox = styled(Link)`
  width: calc(25% - 20px);
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 0;
  text-align: left;
  padding: 25px;
  border-radius: 4px;
  transition: 0.35s;
  background: #5918e6;
  margin: 10px;
  position: relative;
  box-sizing: border-box;
  color: #e6c018;
  @media (max-width: 1289px) {
    width: calc(33% - 20px);
  }
  @media (max-width: 480px) {
    width: calc(100% - 20px);
    margin-right: 0;
  }
  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }
  &:hover {
    background: #8661d8;
    box-shadow: 0 4px 12px rgba(38, 174, 97, 0.35);
    color: #fff;
  }
`;
const BoxIcon = styled.div`
  font-size: 36px;
  line-height: 32px;
  position: relative;

  svg {
    height: 42px;
    display: block;
    transition: 0.35s;
    margin-bottom: 2px;
    color: #c018e6;
  }
`;
const BoxCounter = styled.div`
  color: #e6c018;
  margin: 0 auto 0 0;
  transition: 0.35s;
  margin-bottom: 18px;
  display: inline-block;
  position: absolute;
  right: 25px;
  top: 50%;
  background: transparent !important;
  font-size: 48px;
  opacity: 0.18;
  font-weight: 500;
  transform: translateY(-50%);
`;
const BoxContent = styled.div`
  position: static;
  bottom: 30px;
  left: 34px;
  width: auto;
  z-index: 50;
  box-sizing: border-box;
`;

const JobsRow = styled.div`
  margin-left: -15px;
  margin-right: -15px;
  margin-top: 55px !important;
  margin-left: -15px;
  margin-right: -15px;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  &:after {
    content: " ";
    display: table;
  }
`;
const JobsLeftCol = styled.div`
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  position: relative;
  min-height: 1px;
  @media (min-width: 768px) {
    width: 66.66666667%;
    float: left;
  }
  div {
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
    &:before {
      content: " ";
      display: table;
    }
    &:after {
      content: " ";
      display: table;
      clear: both;
    }
  }
`;
const JobsRightCol = styled.div`
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  position: relative;
  min-height: 1px;
  @media (min-width: 768px) {
    width: 33.33333333%;
    float: left;
  }
  div {
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    &:before {
      content: " ";
      display: table;
    }
    &:after {
      content: " ";
      display: table;
      clear: both;
    }
  }
`;
const LeftContent = styled.div`
  margin-bottom: 35px;
  position: relative;
  ul {
    margin-bottom: 30px;
    list-style: none;
    margin-left: 0px;
    li {
      padding: 0px;
      border-top: 0px;
      border: none;
      line-height: 24px;
      transition: 0.3s !important;
      z-index: auto !important;
      background-color: #fff;
      a {
        border-radius: 4px 4px 0 0;
        background-color: #fffcee;
        display: flex;
        padding: 25px;
        border-left: 4px solid #eee;
        transition: 0.3s;
        position: relative;
        overflow: hidden;
        border: 1px solid #e0e0e0;
        margin-top: -1px;
        width: auto;
        height: auto;
        background: #fff;
      }
    }
  }
`;
const ListingLogo = styled.div`
  width: 60px;
  min-width: 60px;
  flex-wrap: wrap;
  float: none;
  margin: 0px;
  img {
    float: none;
    margin: 0px;
    padding: 0px;
    display: inline-block;
    border-radius: 3px;
    transform: translate3d(0, 0, 0);
    width: 60px;
    height: 60px;
  }
`;

const ListingTitle = styled.div``;
const ListingIcons = styled.ul``;

const H3 = styled.h3`
  text-align: left;
  margin-bottom: 25px !important;
  margin-top: 0 !important;
  font-weight: 400;
  font-size: 22px;
`;
const H4 = styled.h4`
  text-align: left;
  letter-spacing: 0;
  font-size: 17px;
  line-height: 27px;
  margin-bottom: 5px;
  color: #5918e6;
  margin-top: 2px;
`;
const Br = styled.br`
  margin-top: 50px !important;
  position: relative;
  left: -35.2px;
  box-sizing: border-box;
  width: 1010px;
`;
export {
  Container,
  RowWrapper,
  CategoriesContainer,
  CategoryBox,
  BoxCounter,
  ListingLogo,
  ListingTitle,
  ListingIcons,
  BoxContent,
  LeftContent,
  BoxIcon,
  Center,
  JobsRow,
  JobsLeftCol,
  JobsRightCol,
  H3,
  H4,
  Br,
};
