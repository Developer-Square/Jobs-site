import * as ROUTE from "constants/routes.constants";

const arr = [
  ROUTE.LANDING,
  ROUTE.PAGES,
  ROUTE.VACANCIES,
  ROUTE.CATEGORIES,
  ROUTE.PRICING,
  ROUTE.CONTACT,
];

export function isCategoryPage(pathname) {
  return arr.includes(pathname);
}
