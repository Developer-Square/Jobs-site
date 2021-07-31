import React, { memo, useContext } from "react";
import { isItemVisible, safetyCheck } from "utils";
import PageContext from "contexts/page/page.provider";

const HobbyA = ({ id, name }) => (
  <div key={id}>
    <h6 className="font-semibold text-sm">{name}</h6>
  </div>
);

const HobbiesA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.hobby) ? (
    <div>
      <Heading>{data.hobby.heading}</Heading>
      <div className="grid gap-2">
        {data.hobby.items.map((x) => isItemVisible(x) && HobbyA(x))}
      </div>
    </div>
  ) : null;
};

export default memo(HobbiesA);
