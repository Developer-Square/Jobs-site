// **************** ROUTE CONSTANT START **************************
// General Page Section
export const DASHBOARD = "/";
export const SETTINGS = "/dashboard/profile";
export const STAFF_MEMBERS = "/staff-members";
export const SITE_SETTINGS = "/site-settings";
// **************** ROUTE CONSTANT END **************************

export const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://backend.thedatabase.co.ke/API/v1";
export const BASE_GRAPHQL_URL =
  process.env.REACT_APP_BASE_GRAPHQL_URL || "http://backend.thedatabase.co.ke/graphql/";
export const BASE_GRAPHQL_WS_URL =
  process.env.REACT_APP_BASE_GRAPHQL_WS_URL || "wss://backend.thedatabase.co.ke/graphql/";

export const CURRENCY = process.env.REACT_APP_CURRENCY || "Ksh. ";
export const serviceWorkerTimeout =
  parseInt(process.env.REACT_APP_SERVICE_WORKER_TIMEOUT, 10) || 60 * 1000;
export const vacancyLimit = 6;
export const landingVacancyLimit = 5;
export const industriesInnerLimit = 15;
export const landingPageIndustriesLimit = 8;
export const searchLimit = 10;
