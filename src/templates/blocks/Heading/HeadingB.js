import React, { memo, useContext } from "react";
import PageContext from "contexts/page/page.provider";

const HeadingB = ({ children }) => {
  const { data } = useContext(PageContext);

  return (
    <h6
      className="mb-2 border-b-2 pb-1 font-bold uppercase tracking-wide text-sm"
      style={{
        color: data.resumemetadata.primaryColor,
        borderColor: data.resumemetadata.primaryColor,
      }}
    >
      {children}
    </h6>
  );
};

export default memo(HeadingB);
