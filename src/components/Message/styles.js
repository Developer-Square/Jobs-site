import { styled } from "styles";
import { themeGet } from "@styled-system/theme-get";

const borderColors = (theme) => ({
  action: themeGet("colors.rose", "#c22d74"),
  error: themeGet("colors.rose", "#c22d74"),
  neutral: themeGet("colors.turquoiseDark", "#06a09e"),
  success: themeGet("colors.green", "#3ed256"),
});

export const Wrapper = styled.div`
  background-color: ${themeGet("message.backgroundColor", "#fff")};
  padding: ${themeGet("message.padding", "1rem 1.5rem")};
  text-transform: uppercase;
  border-radius: 3px;
  border-left: 0.4rem solid;
  border-color: ${(props) => borderColors()[props.status]};
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 6px 15px 3px rgba(0, 0, 0, 0.25);
  font-family: Arial;
  width: ${themeGet("message.width", "25rem")};
  box-sizing: border-box;
  pointer-events: all;
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
  background-color: ${(props) => borderColors()[props.status]};
  cursor: pointer;

  path {
    transition: 0.3s;
  }

  &:hover {
    path {
      fill: #fff;
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
