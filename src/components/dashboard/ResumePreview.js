import { MdMoreHoriz, MdOpenInNew } from "react-icons/md";
import { Menu, MenuItem } from "@material-ui/core";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import DatabaseContext from "contexts/database/database.provider";
import ModalContext from "contexts/modal/modal.provider";
import * as styles from "./ResumePreview.module.css";
import { useHistory } from "react-router-dom";
import moment from "moment";
import resumeImg from "image/glalie.png";
import { getDBIdFromGraphqlId } from "utils";

const menuToggleDataTestIdPrefix = "resume-preview-menu-toggle-";

const ResumePreview = ({ resume }) => {
  const navigate = useHistory();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { emitter, events } = useContext(ModalContext);
  const { duplicateResume, deleteResume } = useContext(DatabaseContext);

  const handleOpen = () =>
    navigate.push(
      `/dashboard/resume/builder/${getDBIdFromGraphqlId(
        resume.id,
        "ResumeNode",
      )}`,
    );

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDuplicate = () => {
    duplicateResume(resume);
    setAnchorEl(null);
  };

  const handleRename = () => {
    emitter.emit(events.CREATE_RESUME_MODAL, resume);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteResume(resume.id);
    toast(t("dashboard.toasts.deleted", { name: resume.name }));
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.resume}>
      <div className={styles.backdrop}>
        <img
          src={resume.preview ? resume.preview : resumeImg}
          alt={resume.name}
        />
      </div>
      <div className={styles.page}>
        <MdOpenInNew
          color="#fff"
          size="48"
          className="cursor-pointer"
          onClick={handleOpen}
        />
        <MdMoreHoriz
          data-testid={`${menuToggleDataTestIdPrefix}${resume.id}`}
          color="#fff"
          size="48"
          className="cursor-pointer"
          aria-haspopup="true"
          onClick={handleMenuClick}
        />
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDuplicate}>
            {t("dashboard.buttons.duplicate")}
          </MenuItem>
          <MenuItem onClick={handleRename}>
            {t("dashboard.buttons.rename")}
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <span className="text-red-600 font-medium">
              {t("shared.buttons.delete")}
            </span>
          </MenuItem>
        </Menu>
      </div>
      <div className={styles.meta}>
        <span>{resume.name}</span>
        {resume.updatedAt && (
          <span>
            {t("dashboard.lastUpdated", {
              timestamp: moment(resume?.updatedAt).fromNow(),
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;

export { menuToggleDataTestIdPrefix };
