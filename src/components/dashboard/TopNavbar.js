import { Link } from "react-router-dom";
import React, { memo } from "react";
import * as styles from "./TopNavbar.module.css";
import Avatar from "components/shared/Avatar";
import Logo from "components/Logo/Logo";

const TopNavbar = () => (
  <div className={styles.navbar}>
    <div className="container" style={{ width: "100%" }}>
      <Link to="/">
        <Logo size="40px" />
      </Link>
      <Avatar className="ml-8" />
    </div>
  </div>
);

export default memo(TopNavbar);
