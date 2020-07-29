import React from "react";
import {useHistory} from "react-router-dom";
import { LogoBox, LogoImage } from "./Logo.style";

const Logo = ({ imageUrl, alt, onClick }) => {
  const history = useHistory();
  function onLogoClick() {
    history.push("/");
    if (onClick) {
      onClick();
    }
  }
  return (
    <LogoBox onClick={onLogoClick}>
      <LogoImage src={imageUrl} alt={alt} />
    </LogoBox>
  );
};

export default Logo;
