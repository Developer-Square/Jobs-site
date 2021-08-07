import { MdFileUpload } from "react-icons/md";
import { Tooltip } from "@material-ui/core";
import React, { memo, useRef } from "react";

import { handleKeyUp } from "utils";
import Input from "./Input";
import * as styles from "./PhotoUpload.module.css";
import { TypedAvatarUpdateMutation } from "pages/Profile/mutations";
import { handleAvatarUpdate } from "utils";

const PhotoUpload = () => {
  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <TypedAvatarUpdateMutation
      onCompleted={(data, errors) => handleAvatarUpdate(data, errors, alert)}
    >
      {(updateAvatar) => {
        const handleAvatarChange = (e) => {
          console.log(e);
          const file = e.target.files;
          console.log(file);
          for (let i = 0; i < file.length; i++) {
            const f = file[i];
            updateAvatar({
              variables: { image: f },
            })
              .then((res) => {
                handleAvatarUpdate(res.data, null, alert);
              })
              .catch((err) => console.log(err));
          }
        };

        return (
          <div className="flex items-center">
            <Tooltip title={`Upload Photograph`} placement="right-start">
              <div
                role="button"
                tabIndex="0"
                className={styles.circle}
                onClick={handleIconClick}
                onKeyUp={(e) => handleKeyUp(e, handleIconClick)}
              >
                <MdFileUpload size="22px" />
                <input
                  name="avatar"
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </Tooltip>

            <Input
              name="photograph"
              label={`Photograph`}
              className="pl-6 w-full"
              path="owner.avatar.url"
            />
          </div>
        );
      }}
    </TypedAvatarUpdateMutation>
  );
};

export default memo(PhotoUpload);
