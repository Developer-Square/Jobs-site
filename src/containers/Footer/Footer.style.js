import styled from "styled-components";

export const FooterWrapper = styled.div`
  font-size: 15px;
  background-color: #282828;
  color: #909090;
  width: 100%;
`;
export const TopSection = styled.div`
  border-bottom: 1px solid #363636;
`;
export const MiddleSection = styled.div`
  padding: 60px 0 40px 0;
  position: relative;
  z-index: 10;
`;

export const BottomSection = styled.div`
  padding: 25px 0;
  border-top: 1px solid #333;
`;

export const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  padding: 0;
  &:before,
  &:after {
    content: "\0020";
    display: block;
    overflow: hidden;
    visibility: hidden;
    width: 0;
    height: 0;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    padding: 0 15px;
  }
  @media only screen and (max-width: 767px) and (min-width: 480px) {
    width: 420px;
  }
  @media only screen and (max-width: 990px) and (min-width: 768px) {
    width: 768px;
  }
`;

export const Row = styled.div`
  margin: 0;
  zoom: 1;
  &:before,
  &:after {
    content: "\0020";
    display: block;
    overflow: hidden;
    visibility: hidden;
    width: 0;
    height: 0;
  }
`;
export const Column = styled.div`
  width: 1180px;
  float: left;
  display: inline;
  margin-left: 10px;
  margin-right: 10px;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;
export const FooterContainer = styled.div`
  display: block;
  height: 96px;
  position: relative;
  z-index: 100;
  @media (max-width: 992px) {
    height: auto;
    padding: 20px 0 40px 20px;
  }
`;

export const TopLeft = styled.div`
  height: 100%;
  position: relative;
  display: inline-block;
  @media (max-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    float: none;
    height: auto;
  }
  @media (min-width: 992px) {
    position: absolute;
  }
`;
export const TopLeftWrapper = styled.div`
  position: relative;
  top: auto;
  transform: translateY(-50%);
  top: 50%;
  position: relative;
  height: 36px;
  span {
    position: relative;
    top: 0;
    max-height: 36px;
    max-width: 100%;
  }
`;
export const TopRight = styled.div`
  height: 100%;
  position: relative;
  display: inline-block;
  @media (max-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    float: none;
    height: auto;
  }
`;

export const TopRightWrapper = styled.div`
  padding-left: 35px;

  display: inline-block;
  padding: 0 35px;
  border-right: 1px solid #363636;
  border-left: 1px solid #363636;
  height: 100%;
  div {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      margin-top: 0px;
      margin-bottom: 0px;
      li {
        border-color: #363636;
        padding-left: 59px;
        position: relative;
        cursor: default;
        flex: auto;
        flex-grow: 0;
        svg {
           {
            font-size: 24px;
            color: #fff;
            position: absolute;
            left: 0;
            top: 4px;
            height: 44px;
            width: 44px;
            line-height: 44px;
            border-radius: 3px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(11, 11, 11, 0.15);
            transition: 0.3s;
          }
        }
        &:last-child {
          margin-right: 0;
          padding-right: 0;
          border-right: none;
        }
      }
    }
  }
`;
