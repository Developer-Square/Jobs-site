import * as ROUTE from "constants/routes.constants";

const arr = [
  ROUTE.LANDING,
  ROUTE.VACANCIES,
  ROUTE.CATEGORIES,
  ROUTE.PRICING,
  ROUTE.CONTACT,
  ROUTE.baseUrl,
  "",
];

export function isCategoryPage(pathname) {
  return arr.includes(pathname);
}
