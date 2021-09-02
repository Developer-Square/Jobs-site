import { MdMoreHoriz } from "react-icons/md";
import { Menu, MenuItem } from "@material-ui/core";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import DatabaseContext from "contexts/database/database.provider";
import ModalContext from "contexts/modal/modal.provider";
import * as styles from "./AddressSummary.module.css";

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
        <div className="p-6 rounded-lg shadow-lg">
          <div className="flex items-baseline">
            {address.isDefaultAddress && (
              <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                Default
              </span>
            )}
          </div>

          <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider leading-tight truncate">
            {address.firstName} {address.LastName}
          </div>
          <div className="mt-4">
            {address.companyName && (
              <p className="text-sm text-gray-600  truncate">
                &bull;➜ {address.companyName}
              </p>
            )}
            {address.phone && (
              <p className="text-sm text-gray-600  truncate">
                {" "}
                &bull;➜ {address.phone}
              </p>
            )}
            {address.city && (
              <p className="text-sm text-gray-600  truncate">
                {" "}
                &bull;➜ {address.city}
              </p>
            )}
            {address.streetAddress1 && (
              <p className="text-sm text-gray-600  truncate">
                &bull;➜ {address.streetAddress1}
              </p>
            )}
            {address.streetAddress2 && (
              <p className="text-sm text-gray-600  truncate">
                &bull;➜ {address.streetAddress2}
              </p>
            )}
          </div>
        </div>
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
        <span>
          {address.firstName}
          {address.lastName}
        </span>
      </div>
    </div>
  );
};

export default AddressPreview;

export { menuToggleDataTestIdPrefix };
