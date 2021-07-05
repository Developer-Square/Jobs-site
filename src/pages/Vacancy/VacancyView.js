/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "components/Loader/Loader";
import { MetaWrapper } from "components/Meta";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import NoResultFound from "components/NoResult/NoResult";

import {
  TypedVacancyDetailQuery,
  TypedJobMinQualificationQuery,
  TypedJobYearsOfExpQuery,
} from "./queries";
import Page from "./Page";

const VacancyView = () => {
  const match = useRouteMatch();
  const [vacancyID, setVacancyID] = React.useState(match.params.vacancyID);

  React.useEffect(() => {
    if (match.params.vacancyID) {
      setVacancyID(match.params.vacancyID);
    }
  }, [match.params.vacancyID]);

  const variables = {
    id: vacancyID,
  };

  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedVacancyDetailQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {(vacancyData) => {
            if (vacancyData.loading) {
              return <Loader />;
            }
            if (vacancyData.errors) {
              toast.error(
                "Oops! TheDatabase Kenya ran into an unexpected problem",
              );
            }

            if (vacancyData.data && vacancyData.data.vacancy === null) {
              return <NoResultFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <MetaWrapper
                meta={{
                  description:
                    vacancyData.data.vacancy.descriptionPlaintext ||
                    vacancyData.data.vacancy.seoDescription,
                  title:
                    vacancyData.data.vacancy.title ||
                    vacancyData.data.vacancy.seoTitle,
                }}
              >
                <TypedJobMinQualificationQuery>
                  {(qualificationData) => {
                    if (qualificationData.loading) {
                      return <Loader />;
                    }
                    return (
                      <TypedJobYearsOfExpQuery>
                        {(yearsData) => {
                          if (yearsData.loading) {
                            return <Loader />;
                          }
                          return (
                            <Page
                              qualificationData={
                                qualificationData?.data?.__type?.enumValues
                              }
                              yearsData={yearsData?.data?.__type?.enumValues}
                              types={vacancyData?.data?.__type?.enumValues}
                              data={vacancyData.data.vacancy}
                            />
                          );
                        }}
                      </TypedJobYearsOfExpQuery>
                    );
                  }}
                </TypedJobMinQualificationQuery>
              </MetaWrapper>
            );
          }}
        </TypedVacancyDetailQuery>
      )}
    </NetworkStatus>
  );
};

export default VacancyView;
