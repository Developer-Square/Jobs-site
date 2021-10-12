import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import CreateResume from "components/dashboard/CreateResume";
import LoadingScreen from "components/LoadingScreen";
import { MetaWrapper } from "components/Meta";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import NoResultFound from "components/NoResult/NoResult";
import ResumePreview from "components/dashboard/ResumePreview";
import DatabaseContext from "contexts/database/database.provider";

import { useTimer } from "helpers";

import { TypedQuery } from "core/queries";
import { RESUMES_QUERY } from "graphql/queries";

export const TypedResumesQuery = TypedQuery(RESUMES_QUERY);

const ResumeDashboard = ({ user }) => {
  const { t } = useTranslation();
  const red = useTimer(5);
  const { refetchResumes } = React.useContext(DatabaseContext);

  const variables = {};

  if (refetchResumes) {
    return <React.Fragment />;
  }

  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedResumesQuery
          variables={variables}
          errorPolicy="all"
          // fetchPolicy="no-cache"
          loaderFull
        >
          {(resumeData) => {
            if (resumeData.loading && red !== 0) {
              return <LoadingScreen />;
            }
            if (resumeData.errors) {
              toast.error(
                "Oops! TheDatabase Kenya ran into an unexpected problem",
              );
            }

            if (resumeData.data && resumeData.data.myResumes === null) {
              return <NoResultFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <MetaWrapper
                meta={{
                  description: "The Database Resume Builder",
                  title: t("dashboard.title") || t("shared.appName"),
                }}
              >
                <div
                  className="container mt-12 px-12 xl:px-0"
                  style={{ width: "100%" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    <CreateResume />

                    {resumeData.data.myResumes.map((x) => (
                      <ResumePreview key={x.id} resume={x} />
                    ))}
                  </div>
                </div>
              </MetaWrapper>
            );
          }}
        </TypedResumesQuery>
      )}
    </NetworkStatus>
  );
};

export default ResumeDashboard;
