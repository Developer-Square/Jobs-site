import React, { memo } from "react";
import { BsBoxArrowRight, BsBoxArrowLeft } from "react-icons/bs";
import * as styles from "./RightNavbar.module.css";
import SectionIcon from "components/shared/SectionIcon";
import SyncIndicator from "./SyncIndicator";
import sections from "data/rightSections";
import SettingsContext from "contexts/settings/settings.provider";

const SideBarToggleIcon = ({ className }) => {
  const { isSideBarOpen, setSideBarToggle } = React.useContext(SettingsContext);
  const ToggleIcon = isSideBarOpen ? BsBoxArrowRight : BsBoxArrowLeft;
  return (
    <button
      className={className}
      onClick={() => setSideBarToggle(!isSideBarOpen)}
    >
      <ToggleIcon size="18px" />
    </button>
  );
};

const RightNavbar = () => (
  <div className={styles.container}>
    <div className="grid grid-cols-1 gap-4 text-primary-500">
      {sections.map((x) => (
        <SectionIcon
          key={x.id}
          section={x}
          containerId="RightSidebar"
          tooltipPlacement="left"
        />
      ))}
    </div>
    <SideBarToggleIcon className="mt-auto" />

    <hr className="my-6" />

    <SyncIndicator />
  </div>
);

export default memo(RightNavbar);
