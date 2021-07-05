import { createGlobalStyle } from "styled-components";
import * as C from "./styleConstants";

export const GlobalStyle = createGlobalStyle`

  .quick-view-overlay{
    background-color: rgba(0,0,0,.5)
  }

  .add-address-modal,
  .add-contact-modal{
    box-shadow: 0 10px 40px rgba(0,0,0,0.16);
    border-radius: 3px !important;
    .innerRndComponent{
      width: 100%;
      padding: 30px;
      height: auto;
      background-color: #f7f8f9;
      border: 0;
      box-sizing: border-box;
    }
  }

  .search-modal-mobile{
    transform: none!important;                                                                                                                                                                                                                                                                                                                                                                                                              
    max-width: none!important;
    max-height: none!important;
    top: 0!important;
    left: 0!important;
    background: transparent!important;
    border-radius: 0!important;
  }

  .reuseModalCloseBtn{
    right: 10px!important;
    background-color: #ffffff!important;
    color: #222222!important;
    border-radius: 15px!important;
    padding: 0 9px!important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  }

  .page-transition-enter {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  .page-transition-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: opacity ${C.TIMEOUT}ms, transform ${C.TIMEOUT}ms;
  }
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity ${C.TIMEOUT}ms;
  }
  .loading-indicator-appear,
  .loading-indicator-enter {
    opacity: 0;
  }
  .loading-indicator-appear-active,
  .loading-indicator-enter-active {
    opacity: 1;
    transition: opacity ${C.TIMEOUT}ms;
  }

  .rc-table-fixed-header .rc-table-scroll .rc-table-header{
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;

    th {
      padding: 8px 20px;
      }
  }

  .drawer-content-wrapper{
    *:focus {
      outline: none;
    }
  }

  .rc-table-content{
    border: 0;
  }

  #__react-alert__ {
    > div {
      z-index: 9999;
      top: 0;
      > div {
        margin: 5px;
      }
    }
  }

`;
