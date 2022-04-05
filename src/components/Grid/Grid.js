import { themeGet } from "@styled-system/theme-get";
import styled from "styled-components";

export const Grid = styled.div`
  display: block;
  max-width: 100%;

 .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-radius: 4px;
    input[type='text'], input[type='email'], input[type='number'], input[type='password'], textarea, select {
      display: initial;
      height: auto;
      width: auto;
    }
    .table {
      border-spacing: 0 15px;
    }
  }

  table {
    border-spacing: 0;
    // background: ${themeGet("colors.white", "#fff")};

    thead {
      // background-color: #333 !important;
      // color: #fff !important;
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    // tr td:last-child,
    // tr th:last-child {
    //   border-radius: 0 .625rem .625rem 0;
    // }

    // tr td:nth-child(1),
    // tr th:nth-child(1) {
    //   border-radius: .625rem 0 0 .625rem;
    // }
    th{
      font-family:Lato: sans-serif;
      font-weight: 700;
      // color:${themeGet("colors.blue.dark", "#161F6A")}  !important;
      align-items:center;
      box-shadow:rgba(0, 0, 0, 0.16) 0px 1px 4px;
      border-color:#0000003d;
      align-self:start;
      padding-left: 5px;  
      padding-bottom: 5px;  
      padding-right: 5px;  
      padding-top: 5px;
    }

    td {
      margin: 0;
      // padding: 0.5rem;
      border-bottom: 2px solid #00000017;
      // color:${themeGet("colors.blue.dark", "#161F6A")};
      
      width: 1%;
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }
`;
