import { css } from "styled-components";

import {
  largeScreen,
  mediumScreen,
  smallScreen,
  xLargeScreen,
  xxLargeScreen,
  xxxLargeScreen,
} from "./styleConstants";

const breakpoints = {
  largeScreen,
  mediumScreen,
  smallScreen,
  xLargeScreen,
  xxLargeScreen,
  xxxLargeScreen,
};

export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (literals, ...placeholders) =>
    css`
      @media (max-width: ${breakpoints[label]}px) {
        ${css(literals, ...placeholders)}
      }
    `;
  return acc;
}, {});
