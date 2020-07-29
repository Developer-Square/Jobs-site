import styled from "styled-components";

export const FooterWrapper = styled.div`
  font-size: 15px;
  background-color: #282828;
  color: #909090;
`;
export const TopSection = styled.div`
  border-bottom: 1px solid #363636;
`;
export const MiddleSection = styled.div``;

export const BottomSection = styled.div``;

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
