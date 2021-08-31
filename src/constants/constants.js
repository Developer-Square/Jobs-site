// **************** ROUTE CONSTANT START **************************
// General Page Section
export const DASHBOARD = "/";
export const SETTINGS = "/dashboard/profile";
export const STAFF_MEMBERS = "/staff-members";
export const SITE_SETTINGS = "/site-settings";
// **************** ROUTE CONSTANT END **************************

export const BASE_URL =
  process.env.BASE_URL || "https://thedb.hewani.io/API/v1";
export const BASE_GRAPHQL_URL =
  process.env.BASE_GRAPHQL_URL || "https://thedb.hewani.io/graphql/";
export const BASE_GRAPHQL_WS_URL =
  process.env.BASE_GRAPHQL_WS_URL || "wss://thedb.hewani.io/graphql/";

export const CURRENCY = "Ksh";
export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT, 10) || 60 * 1000;
export const vacancyLimit = 6;
export const landingVacancyLimit = 5;
export const industriesInnerLimit = 15;
export const searchLimit = 10;
