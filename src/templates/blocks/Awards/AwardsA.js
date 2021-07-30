import React, { memo, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { formatDate, isItemVisible, safetyCheck } from "utils";
import PageContext from "contexts/page/page.provider";

const AwardItem = ({ item, language }) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="flex flex-col text-left mr-2">
        <h6 className="font-semibold text-sm">{item.title}</h6>
        <span className="text-xs">{item.organization}</span>
      </div>
      {item.date && (
        <h6 className="text-xs font-medium text-right">
          {formatDate({ date: item.date, language })}
        </h6>
      )}
    </div>
    {item.summary && (
      <ReactMarkdown className="markdown mt-2 text-sm">
        {item.summary}
      </ReactMarkdown>
    )}
  </div>
);

const AwardsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.award) ? (
    <div>
      <Heading>{data.award.heading}</Heading>
      <div className="grid gap-4">
        {data.award.items.map(
          (x) =>
            isItemVisible(x) && (
              <AwardItem
                key={x.id}
                item={x}
                language={data.resumemetadata.language}
              />
            ),
        )}
      </div>
    </div>
  ) : null;
};

export default memo(AwardsA);
