import React, { memo, useMemo } from "react";
import { toast } from "react-toastify";
import { useHistory, useRouteMatch } from "react-router-dom";
import omitDeep from "omit-deep-lodash";
import LoadingScreen from "components/LoadingScreen";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import { MetaWrapper } from "components/Meta";
import NetworkStatus from "components/NetworkStatus";
import { TypedQuery } from "core/queries";
import { FETCH_RESUME } from "graphql/queries";
import { getGraphqlIdFromDBId } from "utils";
import NoResultFound from "components/NoResult/NoResult";

import ResumeBuilderView from "./ResumeBuilderView";

export const TypedResumeQuery = TypedQuery(FETCH_RESUME);
const ResumeBuilder = () => {
  const match = useRouteMatch();
  const navigate = useHistory();
  const [resumeID, setResumeID] = React.useState(
    getGraphqlIdFromDBId(match.params.resumeID, "ResumeNode"),
  );

  React.useEffect(() => {
    if (match.params.resumeID) {
      setResumeID(getGraphqlIdFromDBId(match.params.resumeID, "ResumeNode"));
    }
  }, [match.params.resumeID]);

  return useMemo(() => {
    return (
      <NetworkStatus>
        {(isOnline) => (
          <TypedResumeQuery
            variables={{
              id: resumeID,
            }}
            errorPolicy="all"
            loaderFull
          >
            {(resumeData) => {
              if (resumeData.loading) {
                return <LoadingScreen />;
              }
              if (resumeData.data && resumeData.data.resume === null) {
                return <NoResultFound />;
              }

              if (resumeData.data && resumeData?.data?.resume === null) {
                navigate.push("/dashboard/resume");
                toast.error(
                  "The resume you were looking for does not exist anymore... or maybe it never did?",
                );
              }

              if (!isOnline) {
                return <OfflinePlaceholder />;
              }

              return (
                <MetaWrapper
                  meta={{
                    description: resumeData?.data?.resume?.seoDescription,
                    title: resumeData.data.resume.seoTitle,
                    type: "resume CV",
                  }}
                >
                  <ResumeBuilderView
                    resume={omitDeep(resumeData.data.resume, "__typename")}
                    resumeID={resumeID}
                  />
                </MetaWrapper>
              );
            }}
          </TypedResumeQuery>
        )}
      </NetworkStatus>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeID]);
};

export default memo(ResumeBuilder);
