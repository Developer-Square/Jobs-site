import React, { memo, useContext } from "react";
import { formatDate } from "utils";
import PageContext from "contexts/page/page.provider";

const BirthDateA = () => {
  const { data } = useContext(PageContext);

  if (data.owner?.seeker?.dateOfBirth) {
    return (
      <div className="text-xs">
        <h6 className="capitalize font-semibold">Date of Birth</h6>
        <div>
          <span>
            {formatDate({
              date: data.owner?.seeker?.dateOfBirth,
              language: data.resumemetadata.language,
              includeDay: true,
            })}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default memo(BirthDateA);
