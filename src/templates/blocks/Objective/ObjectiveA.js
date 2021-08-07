import React, { memo, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { safetyCheck } from "utils";
import PageContext from "contexts/page/page.provider";

const ObjectiveA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (
    safetyCheck(data.objective, "descriptionPlaintext") && (
      <div>
        <Heading>{data.objective.heading}</Heading>
        <ReactMarkdown className="markdown text-sm">
          {data.objective.descriptionPlaintext}
        </ReactMarkdown>
      </div>
    )
  );
};

export default memo(ObjectiveA);
