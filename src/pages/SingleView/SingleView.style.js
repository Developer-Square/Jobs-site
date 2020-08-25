import styled from "styled-components";

export const RightCol = styled.div`
  padding: 10px;
  margin: 10px;
  .widget {
    margin-bottom: 35px;
  }
  .widget h4 {
    font-size: 20px;
    margin-bottom: 15px;
  }
  .job-overview {
    border-radius: 3px;
  }
  .job-overview ul {
    list-style: none;
    margin: 0px;
  }
  .job-overview ul li {
    display: flex;
    padding: 10px 0;
  }
  .job-overview ul li:first-child {
    margin-top: 0;
  }
  .job-overview ul li div {
    margin-left: 37px;
  }
  .job-overview ul li span {
    display: block;
    margin-top: 3px;
    line-height: 26px;
  }
  .job_application.application {
    border: 0px;
    margin: 0;
  }
  .clearfix {
    zoom: 1;
  }

  @media (min-width: 710px) {
    margin-left: 10px;
    margin-right: 10px;
  }
  @media (max-width: 710px) {
    padding: 25px 40px;
    width: 100%;
  }
`;
export const LeftCol = styled.div`
  padding: 10px;
  display: block;
  margin-left: 10px;
  margin-right: 10px;
  width: 70%;
  float: left;
  @media (min-width: 710px) {
    width: 70%;
    margin-left: 10px;
    margin-right: 10px;
    padding-right: 20px;
  }
  @media (max-width: 710px) {
    padding-right: 20px;
    width: 100%;
  }
  .single_job_listing {
    > p {
      margin: 0 0 15px 0;
    }
    .job_description p.pfix {
      margin-bottom: 0;
      height: 20px;
    }
    > ul.list-1 {
      margin-left: 0px;
    }
  }
  .clearfix {
    zoom: 1;
  }
  .company-info {
    /* border-bottom: 1px solid #e0e0e0;
    padding-bottom: 33px; */
    margin-bottom: 35px;
    img {
      float: left;
      display: flex;
      height: 108px;
      width: 108px;
      margin-right: 30px;
      max-width: 100%;
    }
    .content {
      display: block;
      margin: 23px 0 0 0px;
      margin: 0;
      margin-top: 2px;
      .button.send-message-to-owner {
        box-shadow: 0 4px 12px rgba(38, 174, 97, 0.25);
        padding: 5px 12px;
        margin-top: 9px;
        font-size: 13px;
      }
    }
    h4 {
      font-size: 18px;
      line-height: 26px;
      margin-bottom: 0px;
      margin-top: 2px;
    }
    span {
      margin-right: 10px;
    }
  }
`;
