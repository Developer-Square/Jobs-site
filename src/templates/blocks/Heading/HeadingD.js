import React, { memo, useContext } from "react";
import { hexToRgb } from "utils";
import PageContext from "contexts/page/page.provider";

const HeadingC = ({ children }) => {
  const { data } = useContext(PageContext);
  const { r, g, b } = hexToRgb(data.resumemetadata.primaryColor) || {};

  return (
    <h6
      className="py-1 px-4 rounded-r leading-loose font-bold text-xs uppercase tracking-wide mb-3"
      style={{
        marginLeft: "-15px",
        color: data.resumemetadata.backgroundColor,
        backgroundColor: `rgba(${r - 40}, ${g - 40}, ${b - 40}, 0.8)`,
      }}
    >
      {children}
    </h6>
  );
};

export default memo(HeadingC);
