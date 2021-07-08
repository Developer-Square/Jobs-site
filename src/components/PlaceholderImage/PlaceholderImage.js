import React from "react";

import NoPhoto from "image/no-photo.svg";

export const PlaceholderImage = ({ alt = "placeholder" }) => {
  return <img src={NoPhoto} alt={alt} />;
};
