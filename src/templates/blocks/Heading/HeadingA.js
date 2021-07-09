import React, { memo, useContext } from "react";
import PageContext from "contexts/page/page.provider";

const HeadingA = ({ children }) => {
  const { data } = useContext(PageContext);

  return (
    <h6
      className="text-xs font-bold uppercase mb-1"
      style={{ color: data.metadata.colors.primary }}
    >
      {children}
    </h6>
  );
};

export default memo(HeadingA);
