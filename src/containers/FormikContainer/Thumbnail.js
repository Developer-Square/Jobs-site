import React from "react";

export const Thumbnail = ({ file }) => {
  if (!file) {
    return null;
  }

  return (
    <img
      src={file}
      alt={"thumbnail"}
      className="img-thumbnail mt-2"
      height={200}
      width={200}
    />
  );
};
