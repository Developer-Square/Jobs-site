import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import Avatar from "components/shared/Avatar";
import * as styles from "./LeftNavbar.module.css";
import SectionIcon from "components/shared/SectionIcon";
import sections from "data/leftSections";
import { MdArrowBack } from "react-icons/md";

const LeftNavbar = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Tooltip title={t("builder.tooltips.backToDashboard")} placement="right">
        <div>
          <Link to="/dashboard/resume">
            <div className="text-4xl">
              <MdArrowBack />
            </div>
          </Link>
        </div>
      </Tooltip>

      <hr className="my-6" />

      <div className="grid grid-cols-1 gap-4 text-primary-500">
        {sections.map((x) => (
          <SectionIcon
            key={x.id}
            section={x}
            containerId="LeftSidebar"
            tooltipPlacement="right"
          />
        ))}
      </div>

      <hr className="mt-auto my-6" />

      <Avatar />
    </div>
  );
};

export default memo(LeftNavbar);
