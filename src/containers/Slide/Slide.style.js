import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const SlidePopupBody = styled.div`
  height: auto;
  width: 385px;
  display: flex;
  flex-direction: column;
  border-radius: ${themeGet("radii.base", "6px")};
  background-color: ${themeGet("colors.white", "#ffffff")};
  box-sizing: content-box;

  @media (max-width: 769px) {
    width: 100%;
  }
`;

export const SlideWrapper = styled.div`
  background-color: ${themeGet("colors.gray.200", "#F7F7F7")};
  position: relative;
  padding: 130px 0 60px 0;

  @media (max-width: 990px) {
    padding: 0;
    padding-top: 60px;
  }
`;

export const SlideContainer = styled.div`
  background-color: ${themeGet("colors.white", "#fff")};
  border: 1px solid ${themeGet("colors.borderColor", "#f1f1f1")};
  padding: 20px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  text-align: center;
  @media (min-width: 990px) {
    width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 480px) {
    padding: 30px;
  }
`;

export const ItemWrapper = styled.div`
  width: 100%;
  height: auto;
`;

export const ItemCards = styled.div`
  width: 100%;
  padding: 15px 25px;
  display: inline-flex;
  align-items: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
  margin-bottom: 1px;
  box-sizing: border-box;
`;

export const PopupHeader = styled.div`
  padding: 15px 25px;
  background-color: ${themeGet("colors.white", "#ffffff")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${themeGet("colors.gray.500", "#f1f1f1")};

  @media (max-width: 766px) {
    justify-content: center;
  }
`;

export const CloseButton = styled.button`
  z-index: 10;
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  outline: 0;
  flex-shrink: 0;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
  transition: all 0.4s ease;
  background-color: transparent;

  &:hover {
    color: ${themeGet("colors.red", "#ea4d4a")};
  }

  @media (max-width: 769px) {
    position: absolute;
    top: -45px;
    background-color: ${themeGet("colors.white", "#ffffff")};
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.5);
  }

  &.fixedProductClose {
    @media (min-width: 991px) {
      display: none;
    }
  }
`;

export const SlidePopup = styled.div`
  width: 400px;
  height: 100vh;
  background-color: ${themeGet("colors.white", "#ffffff")};
  position: fixed;
  bottom: 0;
  right: -760px;
  z-index: 1010;
  box-shadow: ${themeGet("shadows.big", "0 21px 36px rgba(0, 0, 0, 0.16)")};
  transition: all 0.35s ease-in-out;

  @media (max-width: 580px) {
    width: 100%;
    display: none;
  }

  @media (min-width: 581px) {
    display: block;
  }

  &.slidePopupFixed {
    right: 0;
  }

  ${SlidePopupBody} {
    height: 100%;
    width: 100%;
  }

  ${ItemWrapper} {
    /* height: calc(100vh - 240px); */
    max-height: calc(100vh - 245px);
    background-color: ${themeGet("colors.white", "#ffffff")};
  }

  ${ItemCards} {
    border-bottom: 1px solid ${themeGet("colors.gray.200", "#f7f7f7")};
    margin-bottom: 0;
  }

  @media (max-width: 769px) {
    ${PopupHeader} {
      justify-content: space-between;
    }

    ${CloseButton} {
      top: auto;
      position: relative;
      background-color: transparent;
    }
  }
`;
