// **************** ROUTE CONSTANT START **************************
// General Page Section
export const DASHBOARD = "/";
export const PRODUCTS = "/products";
export const CATEGORY = "/category";
export const LOGIN = "/login";
export const LOGOUT = "/logout";
export const ORDERS = "/orders";
export const CUSTOMERS = "/customers";
export const COUPONS = "/coupons";
export const SETTINGS = "/dashboard/profile";
export const STUFF_MEMBERS = "/staff-members";
export const SITE_SETTINGS = "/site-settings";
// **************** ROUTE CONSTANT END **************************

export const BASE_URL = process.env.API_URL || "http://localhost:8000/API/v1/";
export const BASE_GRAPHQL_URL =
  process.env.API_URL || "http://localhost:8000/graphql/";

// export const BASE_URL =  process.env.API_URL || "https://thedb.hewani.io/API/v1/";
// export const BASE_GRAPHQL_URL =  process.env.API_URL || "https://thedb.hewani.io/graphql/";
export const CURRENCY = "Ksh.";
export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT, 10) || 60 * 1000;
