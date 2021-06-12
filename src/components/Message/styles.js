import { styled } from "styles";
import { themeGet } from "@styled-system/theme-get";

const borderColors = (theme) => ({
  action: themeGet("colors.rose", "#c22d74"),
  error: themeGet("colors.rose", "#c22d74"),
  neutral: themeGet("colors.turquoiseDark", "#06a09e"),
  success: themeGet("colors.green", "#3ed256"),
});

export const Wrapper = styled.div`
  width: ${themeGet("message.width", "25rem")};
  padding: ${themeGet("message.padding", "1rem 1.5rem")};
  background-color: ${themeGet("message.backgroundColor", "#fff")};
  box-shadow: 0px 6px 15px 3px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: ${themeGet("spacing.spacer", "1rem")};
  right: ${themeGet("spacing.spacer", "1rem")};
  border-left: 0.4rem solid;
  border-color: ${(props) => borderColors()[props.status]};
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.p`
  text-transform: ${themeGet("message.titleTransform", "uppercase")};
  font-weight: ${themeGet("message.titleWeight", 800)};
  letter-spacing: ${themeGet("message.letterSpacing", "0.5px")};
  margin: ${themeGet("message.titleMargin", "0 1.5rem 0 0")};
`;

export const CloseButton = styled.button`
  cursor: pointer;

  path {
    transition: 0.3s;
  }

  &:hover {
    path {
      fill: ${(props) => borderColors()[props.status]};
    }
  }
`;

export const Content = styled.div`
  margin: ${themeGet("message.contentMargin", "1rem 0 0")};
`;

export const ActionButton = styled.button`
  color: ${themeGet("colors.secondary", "#ff5b60")};
  cursor: pointer;
  font-size: ${themeGet("typography.baseFontSize", "1rem")};
  text-decoration: underline;
`;
