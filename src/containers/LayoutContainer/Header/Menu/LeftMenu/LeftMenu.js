import React from "react";
import { LeftMenuBox } from "./LeftMenu.style";

import { useHistory } from "react-router-dom";

import Logo from "components/Logo/Logo";

export const LeftMenu = ({ logo }) => {
  const history = useHistory();
  return (
    <LeftMenuBox>
      <Logo
        imageUrl={logo}
        alt={"TheDatabase Logo"}
        onClick={() => history.push("/")}
      />
    </LeftMenuBox>
  );
};
