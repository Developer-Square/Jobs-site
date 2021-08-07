import { useTranslation } from "react-i18next";
import React, { memo, useContext } from "react";
import ReactMarkdown from "react-markdown";
import PageContext from "contexts/page/page.provider";
import { formatDateRange, isItemVisible, safetyCheck } from "utils";

const WorkItem = ({ item, language }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left mr-2">
          <h6 className="font-semibold text-sm">{item.company}</h6>
          <span className="text-xs">{item.position}</span>
        </div>
        {item.workStart && (
          <h6 className="text-xs font-medium text-right">
            (
            {formatDateRange(
              {
                startDate: item.workStart,
                endDate: item.workEnd,
                language,
              },
              t,
            )}
            )
          </h6>
        )}
      </div>
      {item.descriptionPlaintext && (
        <ReactMarkdown className="markdown mt-2 text-sm">
          {item.descriptionPlaintext}
        </ReactMarkdown>
      )}
    </div>
  );
};

const WorkA = () => {
  const { data, heading: Heading } = useContext(PageContext);
  return safetyCheck(data.work) ? (
    <div>
      <Heading>{data.work.heading}</Heading>
      <div className="grid gap-4">
        {data.work.items.map(
          (x) =>
            isItemVisible(x) && (
              <WorkItem
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

export default memo(WorkA);
