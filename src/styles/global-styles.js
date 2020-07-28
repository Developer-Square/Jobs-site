import { createGlobalStyle } from "styled-components";
import { NAV_BAR_HEIGHT } from "./styleConstants";

const TIMEOUT = 400;

export const GlobalStyle = createGlobalStyle`
  html,
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
  body {
    
    font-family: "Poppins", sans-serif;
    padding-top: 0;/*${NAV_BAR_HEIGHT};*/
    transition: all 0.25s linear;
    background: #eaeaea;
    color: ${(p) => p.theme.text};

    text-transform: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 27px;
    text-align: left;
    color: #666;

    overflow-x: hidden;
    position: relative;
  }
  .mm-counter {
    background-color: ${(p) => p.theme.primary};
  }
  a, table td.title a:hover, table.manage-table td.action a:hover, #breadcrumbs ul li a:hover, #titlebar span.icons a:hover, .counter-box i, .counter, #popular-categories li a i, .single-resume .resume_description.styled-list ul li:before, .list-1 li:before, .dropcap, .resume-titlebar span a:hover i, .resume-spotlight h4, .resumes-content h4, .job-overview ul li i, .company-info span a:hover, .infobox a:hover, .meta-tags span a:hover, .widget-text h5 a:hover, .app-content .info span, .app-content .info ul li a:hover, table td.job_title a:hover, table.manage-table td.action a:hover, .job-spotlight span a:hover, .widget_rss li:before, .widget_rss li a:hover, .widget_categories li:before, .widget-out-title_categories li:before, .widget_archive li:before, .widget-out-title_archive li:before, .widget_recent_entries li:before, .widget-out-title_recent_entries li:before, .categories li:before, .widget_meta li:before, .widget_recent_comments li:before, .widget_nav_menu li:before, .widget_pages li:before, .widget_categories li a:hover, .widget-out-title_categories li a:hover, .widget_archive li a:hover, .widget-out-title_archive li a:hover, .widget_recent_entries li a:hover, .widget-out-title_recent_entries li a:hover, .categories li a:hover, .widget_meta li a:hover, #wp-calendar tbody td a, .widget_nav_menu li a:hover, .widget_pages li a:hover, .resume-title a:hover, .company-letters a:hover, .companies-overview li li a:hover, .icon-box.rounded i, .icon-box i, #titlebar .company-titlebar span a:hover, .adv-search-btn a, .new-category-box .category-box-icon, body .new-header #navigation>ul>li:hover>a, body .new-header #navigation>ul>li>a:hover, body .new-header #navigation>ul>li>a.current, body .new-header #navigation>ul>li:hover>a, body .new-header #navigation>ul>li>a:hover, .dashboard-nav ul li.active-submenu a, .dashboard-nav ul li:hover a, .dashboard-nav ul li.active a, .new-header .transparent-header #navigation>ul li:hover ul li:hover a:after, .new-header .transparent-header #navigation>ul li:hover a:after, .new-header .transparent-header #navigation>ul li a.current:after, .account-type input.account-type-radio~label:hover i, .transparent-header .login-register-buttons a:hover, .login-register-buttons a:hover, body .new-header #navigation>ul>li>a.current, .new-header #navigation ul li:hover a:after, .new-header #navigation ul li a.current:after {
    color: ${(p) => p.theme.primary};
}
a {
  color: ${(p) => p.theme.primary};
  transition: 0.3s;
}
.old-header .current-menu-item>a, a.button.gray.app-link.opened, ul.float-right li a:hover, .old-header .menu ul li.sfHover a.sf-with-ul, .old-header .menu ul li a:hover, a.menu-trigger:hover, .old-header .current-menu-parent a, #jPanelMenu-menu li a:hover, .search-container button, .upload-btn, button, input[type="button"], input[type="submit"], a.button, .upload-btn:hover, #titlebar.photo-bg a.button.white:hover, a.button.dark:hover, #backtotop a:hover, .mfp-close:hover, .woocommerce-MyAccount-navigation li.is-active a, .woocommerce-MyAccount-navigation li.current-menu-item a, .tabs-nav li.active a, .tabs-nav-o li.active a, .accordion h3.active-acc, .highlight.color, .plan.color-2 .plan-price, .plan.color-2 a.button, .tp-leftarrow:hover, .tp-rightarrow:hover, .pagination ul li a.current-page, .woocommerce-pagination .current, .pagination .current, .pagination ul li a:hover, .pagination-next-prev ul li a:hover, .infobox, .load_more_resumes, .job-manager-pagination .current, .hover-icon, .comment-by a.reply:hover, .chosen-container .chosen-results li.highlighted, .chosen-container-multi .chosen-choices li.search-choice, .list-search button, .checkboxes input[type=checkbox]:checked+label:before, .double-bounce1, .double-bounce2, .widget_range_filter .ui-state-default, .tagcloud a:hover, .filter_by_tag_cloud a.active, .filter_by_tag_cloud a:hover, #wp-calendar tbody td#today, .footer-widget .tagcloud a:hover, .nav-links a:hover, .icon-box.rounded i:after, #mapnav-buttons a:hover, .dashboard-list-box .button.gray:hover, .dashboard-list-box-static .button, .select2-container--default .select2-selection--multiple .select2-selection__choice, #footer-new .footer-widget.widget_nav_menu li a:before, .message-reply button, .account-type input.account-type-radio:checked~label, .mm-menu em.mm-counter, .comment-by a.comment-reply-link:hover, #jPanelMenu-menu .current-menu-item>a, .button.color, .intro-search-button .button {
  background-color: ${(p) => p.theme.primary};
}
.account-type input.account-type-radio~label:hover {
  color: ${(p) => p.theme.primary};
  background-color: rgba(3, 0, 44, 0.1);
}
.select2-container--default .select2-results__option--highlighted[aria-selected], .dashboard-nav ul li span.nav-tag, body .wp-subscribe-wrap input.submit, .adv-search-btn a:after, .panel-dropdown.active>a, body #dashboard table.manage-table tr td:before {
  background: ${(p) => p.theme.primary};
}
body .wp-subscribe-wrap input.submit {
  background-color: ${(p) => p.theme.primary};
  border-radius: 4px;
  margin: 0;
  height: 48px;
  text-align: center;
  line-height: 48px;
  font-size: 18px;
  color: #fff;
  margin-left: 10px;
  transition: 0.3s;
  font-size: 14px;
  padding: 0 15px;
  font-weight: 500;
  flex-wrap: wrap;
  align-items: flex-start;
  text-transform: none;
  flex: 1;
  width: auto;
  min-width: 110px;
}
.new-category-box:hover {
  background: ${(p) => p.theme.primary};
  box-shadow: 0 4px 12px rgb(3 0 44 / 35%);
}
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block;
}

ul{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }

  a{
    text-decoration: none;
  }

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
    transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
  }
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity ${TIMEOUT}ms;
  }
  .loading-indicator-appear,
  .loading-indicator-enter {
    opacity: 0;
  }
  .loading-indicator-appear-active,
  .loading-indicator-enter-active {
    opacity: 1;
    transition: opacity ${TIMEOUT}ms;
  }

  .image-item{
    padding: 0 15px;
  }

  @media (max-width: 1199px) and (min-width: 991px) {
    .image-item{
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  @media (max-width: 768px) {
    .image-item{
      padding-left: 7.5px;
      padding-right: 7.5px;
    }
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

`;
