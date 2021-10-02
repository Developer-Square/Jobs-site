import React from "react";
import { useTranslation } from "react-i18next";
import ButtonStyle from "./Button.style";

const Button = ({
  type,
  size,
  title,
  intlButtonId,
  colors,
  variant,
  icon,
  disabled,
  iconPosition,
  iconStyle,
  onClick,
  loader,
  loaderColor,
  isLoading = false,
  className,
  fullwidth,
  style,
  children,
  ...props
}) => {
  // Checking button loading state
  const buttonIcon =
    isLoading !== false ? (
      <>{loader ? loader : "loading...."}</>
    ) : (
      icon && (
        <span className="btn-icon" style={iconStyle}>
          {icon}
        </span>
      )
    );

  // set icon position
  const position = iconPosition || "right";
  const { t } = useTranslation();
  const Icon = icon;

  return (
    <ButtonStyle
      type={type}
      className={`reusecore__button ${disabled ? "disabled" : ""} ${
        isLoading ? "isLoading" : ""
      } ${className ? className : ""}`.trim()}
      icon={icon}
      disabled={disabled}
      icon-position={position}
      onClick={onClick}
      colors={colors}
      variant={variant}
      fullwidth={fullwidth}
      style={style}
      size={size}
      {...props}
    >
      {children ? (
        <>
          {icon && <Icon size="14" className="mr-3" />}
          {isLoading ? t("shared.buttons.loading") : children}
        </>
      ) : (
        <>
          {position === "left" && buttonIcon}
          {title && !isLoading && <span className="btn-text">{title}</span>}
          {position === "right" && buttonIcon}
        </>
      )}
    </ButtonStyle>
  );
};

Button.defaultProps = {
  disabled: false,
  isLoading: false,
  type: "button",
};

export default Button;
