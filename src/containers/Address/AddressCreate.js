import { MdAdd } from "react-icons/md";
import React, { memo, useContext } from "react";
import * as styles from "./AddressCreate.module.css";
import { handleKeyUp } from "utils";
import ModalContext from "contexts/modal/modal.provider";

const addressCreateButtonDataTestId = "create-address-button";

const AddressCreate = () => {
  const { emitter, events } = useContext(ModalContext);

  const handleClick = () => emitter.emit(events.CREATE_ADDRESS_MODAL);

  return (
    <div className={styles.address}>
      <div className={styles.backdrop}>
        <MdAdd size="48" />
      </div>
      <div
        data-testid={addressCreateButtonDataTestId}
        tabIndex="0"
        role="button"
        className={styles.page}
        onClick={handleClick}
        onKeyUp={(e) => handleKeyUp(e, handleClick)}
      >
        <MdAdd size="48" />
      </div>
      <div className={styles.meta}>
        <p>Create Address</p>
      </div>
    </div>
  );
};

export default memo(AddressCreate);

export { addressCreateButtonDataTestId };
