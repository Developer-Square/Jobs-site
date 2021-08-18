/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-apollo";

import Loader from "components/Loader/Loader";
import { MetaWrapper } from "components/Meta";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import NoResultFound from "components/NoResult/NoResult";
import { TypedQuery } from "core/queries";
import {
  VACANCY_DETAIL_QUERY,
  JobYearsOfExp,
  JobMinQualification,
  JobPayRate,
} from "graphql/queries";
import { VACANCY_VIEW_COUNT_MUTATION } from "graphql/mutations";

import Page from "./Page";
import { getGraphqlIdFromDBId } from "utils";

const TypedVacancyDetailQuery = TypedQuery(VACANCY_DETAIL_QUERY);
const TypedJobYearsOfExpQuery = TypedQuery(JobYearsOfExp);
const TypedJobMinQualificationQuery = TypedQuery(JobMinQualification);
const TypedJobPayRateQuery = TypedQuery(JobPayRate);

const VacancyView = () => {
  const match = useRouteMatch();
  const [vacancyID, setVacancyID] = React.useState(
    getGraphqlIdFromDBId(match.params.vacancyID, "Vacancy"),
  );
  const [viewvacancyCount] = useMutation(VACANCY_VIEW_COUNT_MUTATION);

  const viewJobMutation = () => {
    viewvacancyCount({ variables: { job: vacancyID } });
  };

  React.useEffect(() => {
    if (match.params.vacancyID) {
      setVacancyID(getGraphqlIdFromDBId(match.params.vacancyID, "Vacancy"));
      viewJobMutation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <TypedJobPayRateQuery>
                  {(payRateData) => {
                    if (payRateData.loading) {
                      return <Loader />;
                    }
                    return (
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
                                    vacancyID={vacancyID}
                                    qualificationData={
                                      qualificationData?.data?.__type
                                        ?.enumValues
                                    }
                                    yearsData={
                                      yearsData?.data?.__type?.enumValues
                                    }
                                    types={
                                      vacancyData?.data?.__type?.enumValues
                                    }
                                    data={vacancyData.data.vacancy}
                                    payRateData={
                                      payRateData?.data?.__type?.enumValues
                                    }
                                  />
                                );
                              }}
                            </TypedJobYearsOfExpQuery>
                          );
                        }}
                      </TypedJobMinQualificationQuery>
                    );
                  }}
                </TypedJobPayRateQuery>
              </MetaWrapper>
            );
          }}
        </TypedVacancyDetailQuery>
      )}
    </NetworkStatus>
  );
};

export default VacancyView;
