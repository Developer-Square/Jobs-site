import { get } from "lodash";
import React, { memo, useContext } from "react";
import Icons from "../Icons";
import { formatDate } from "utils";
import PageContext from "contexts/page/page.provider";

const BirthDateB = () => {
  const { data } = useContext(PageContext);
  const Icon = get(Icons, "birthday");

  if (data.owner?.seeker?.dateOfBirth) {
    return (
      <div className="text-xs flex items-center">
        <Icon
          size="10px"
          className="mr-2"
          style={{ color: data.resumemetadata.primaryColor }}
        />
        <span className="font-medium break-all">
          {formatDate({
            date: data.owner?.seeker?.dateOfBirth,
            language: data.resumemetadata.language,
            includeDay: true,
          })}
        </span>
      </div>
    );
  }

  return null;
};

export default memo(BirthDateB);
