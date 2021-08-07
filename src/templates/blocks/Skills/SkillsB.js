import React, { memo, useContext } from "react";
import { isItemVisible, safetyCheck } from "utils";
import PageContext from "contexts/page/page.provider";

const SkillItem = ({ id, name }) => (
  <li key={id} className="text-sm py-1">
    {name}
  </li>
);

const SkillsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.skill) ? (
    <div>
      <Heading>{data.skill.heading}</Heading>
      <ul>{data.skill.items.map((x) => isItemVisible(x) && SkillItem(x))}</ul>
    </div>
  ) : null;
};

export default memo(SkillsA);
