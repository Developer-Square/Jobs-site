import styled from "styled-components";

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
  padding: 15px 30px;
  color: #333;
  display: block;
  > div {
    margin: 0 20px;
    @media (max-width: 710px) {
      margin: 0;
    }
  }
`;

export const Header = styled.header`
  text-align: center;
  min-height: 50px;
  overflow: hidden;
  position: relative;
  display: block;
  width: 100%;
  @media (min-width: 710px) {
    padding: 25px 40px;
  }
  @media (max-width: 710px) {
    display: flex;
  }
`;

export const Container = styled.section`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  @media (min-width: 710px) {
    padding: 25px 40px;
  }
  @media (max-width: 710px) {
    padding: 0;
  }
`;

export const Row = styled.div`
  margin-right: -15px;
  margin-left: -15px;

  @media (min-width: 710px) {
    display: flex;
  }
  @media (max-width: 710px) {
    display: block;
  }
`;

export const Col12 = styled.div`
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 30px;
  width: 100%;
  @media (min-width: 992px) {
    float: left;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
`;
export const Col8 = styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 30px;
  width: 100%;
  @media (min-width: 992px) {
    width: 66.66666667%;
  }
  @media (min-width: 992px) {
    float: left;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    float: left;
  }
`;
export const Col4 = styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 30px;
  width: 100%;
  @media (min-width: 992px) {
    width: 33.33333333%;
  }
  @media (min-width: 992px) {
    float: left;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    float: left;
  }
`;
export const Col6 = styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 30px;
  width: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
`;

export const About = styled.div`
  background: #fff;
  box-shadow: 0px 1px 5px rgba(50, 50, 50, 0.08);
  padding: 40px;
  min-height: 330px;
  display: block;
`;

export const Accent = styled.div`
  font-family: "Proxima Bold";
  line-height: 14px;
  color: #60a9f0;
`;
export const Skills = styled.div`
  background: #1849b1;
  color: #f5f5f5;
  padding: 40px;
  min-height: 330px;
  display: block;
`;

export const Education = styled.div`
  background: #1849b1;
  color: #f5f5f5;
  padding: 40px;
  min-height: 330px;
  display: block;
`;

export const EducationTitle = styled.h4`
  font-family: "Proxima Bold";
  line-height: 14px;
  color: #60a9f0;
`;

export const Languages = styled.div`
  background: #fff;
  box-shadow: 0px 1px 5px rgba(50, 50, 50, 0.08);
  padding: 40px;
  min-height: 330px;
  display: block;
`;
export const Contact = styled.div`
  background: #fff;
  box-shadow: 0px 1px 5px rgba(50, 50, 50, 0.08);
  padding: 40px;
  min-height: 330px;
  display: block;
`;

export const Experience = styled.div`
  background: #1849b1;
  color: #f5f5f5;
  padding: 40px;
  min-height: 330px;
  display: block;
`;

export const Footer = styled.footer`
  color: #f9f9f9;
  text-align: center;
  padding-top: 140px;
  padding-bottom: 100px;
  display: block;
`;

export const SocialIcons = styled.ul`
  padding: 0;
  margin: 0;

  li {
    display: inline-block;
    list-style: none;
    a {
      background: #666666;
      /* border-radius: 50%; */
      color: #fff;
      text-decoration: none;
      font-size: 18px;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      transition: all 0.4s ease-in;
      position: relative;
      bottom: 10px;
      top: 10px;
      padding: 5px;
      svg {
      }
    }
  }
`;
