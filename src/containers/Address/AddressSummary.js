import { MdMoreHoriz } from "react-icons/md";
import { Menu, MenuItem } from "@material-ui/core";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import DatabaseContext from "contexts/database/database.provider";
import ModalContext from "contexts/modal/modal.provider";
import * as styles from "./AddressSummary.module.css";
import moment from "moment";

const menuToggleDataTestIdPrefix = "resume-preview-menu-toggle-";

const AddressPreview = ({ address }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { emitter, events } = useContext(ModalContext);
  const { deleteAddress } = useContext(DatabaseContext);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRename = () => {
    emitter.emit(events.CREATE_ADDRESS_MODAL, address);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteAddress(address.id);
    toast(t("dashboard.toasts.deleted", { name: address.name }));
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.address}>
      <div className={styles.backdrop}>
        <p>{address.companyName}</p>
        <p>{address.phone}</p>
        <p>
          {address.city} {address.streetAddress1}
        </p>
      </div>
      <div className={styles.page}>
        <MdMoreHoriz
          data-testid={`${menuToggleDataTestIdPrefix}${address.id}`}
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
          <MenuItem onClick={handleRename}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>
            <span className="text-red-600 font-medium">
              {t("shared.buttons.delete")}
            </span>
          </MenuItem>
        </Menu>
      </div>
      <div className={styles.meta}>
        <span>{address.name}</span>
        {address.updatedAt && (
          <span>
            {t("dashboard.lastUpdated", {
              timestamp: moment(address?.updatedAt).fromNow(),
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default AddressPreview;

export { menuToggleDataTestIdPrefix };
