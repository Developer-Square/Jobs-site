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
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    input[type='text'], input[type='email'], input[type='number'], input[type='password'], textarea, select {
      display: initial;
      height: auto;
      width: auto;

    }
  }

  table {
    border-spacing: 0;
    background: ${themeGet("colors.white", "#fff")};

    
    

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th{
      font-family:Lato: sans-serif;
      font-weight: 700;
      color:${themeGet("colors.blue.dark", "#161F6A")}  !important;
      align-items:center;
      box-shadow:rgba(0, 0, 0, 0.16) 0px 1px 4px;
      border-color:#0000003d;
      align-self:start;
      padding-left: 16px;  
      padding-bottom: 12px;  
      padding-right: 16px;  
      padding-top: 12px;
    }

    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 2px solid #00000017;
      color:${themeGet("colors.blue.dark", "#161F6A")};
      
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
