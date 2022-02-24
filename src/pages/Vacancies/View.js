import React, { useContext } from "react";

import { StringParam, useQueryParam } from "use-query-params";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import MetaWrapper from "components/Meta/MetaWrapper";
import NetworkStatus from "components/NetworkStatus";
import Page from "./Page";
import { NoResult } from "components/VacancyLoader/VacancyLoader.style";
import Loader from "components/Loader/Loader";
import { vacancyLimit } from "constants/constants";
import { VacancyContext } from "contexts/vacancies/vacancies.context";

import { TypedQuery } from "core/queries";
import { VACANCIES_QUERY } from "graphql/queries";

const TypedVacanciesQuery = TypedQuery(VACANCIES_QUERY);

const View = (props) => {
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam("filters");
  const { vacancyState, vacancyDispatch } = useContext(VacancyContext);
  console.log("kwa view", props);
  const clearFilters = () => {
    setAttributeFilters({});
  };

  const onFiltersChange = (name, value) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes[`${name}`].length === 1) {
          const att = { ...attributeFilters };
          delete att[`${name}`];
          setAttributeFilters({
            ...att,
          });
        } else {
          setAttributeFilters({
            ...attributeFilters,
            [`${name}`]: attributeFilters[`${name}`].filter(
              (item) => item !== value,
            ),
          });
        }
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [`${name}`]: [...attributeFilters[`${name}`], value],
        });
      }
    } else {
      setAttributeFilters({ ...attributeFilters, [`${name}`]: [value] });
    }
  };

  const filters = {
    first: vacancyLimit,
    search: "",
    ids: [],
    industries: [],
  };

  const sortOptions = [
    {
      label: "Clear...",
      value: null,
    },
    {
      label: "Last updated Ascending",
      value: "updated_at",
    },
    {
      label: "Price High-Low",
      value: "-updated_at",
    },
    {
      label: "Salary Low-High",
      value: "salary",
    },
    {
      label: "Salary High-Low",
      value: "-salary",
    },
    {
      label: "Name Increasing",
      value: "title",
    },
    {
      label: "Name Decreasing",
      value: "-title",
    },
  ];

  const variables = {
    ...filters,
    sortBy: {
      field: "CREATED_AT",
      direction: "ASC",
    },
  };

  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedVacanciesQuery variables={variables} errorPolicy="all" loaderFull>
          {(vacancyData) => {
            if (vacancyData.loading) {
              return <Loader />;
            }

            if (vacancyData.data && vacancyData.data.vacancies === null) {
              return <NoResult />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            // Only update the jobTypes in the context API when its empty.
            if (
              vacancyData.data.__type.enumValues &&
              vacancyState.jobTypes.length === 0
            ) {
              vacancyDispatch({
                type: "SET_JOB_TYPES",
                payload: vacancyData.data.__type.enumValues,
              });
              vacancyDispatch({
                type: "ADD_TOTAL_COUNT",
                payload: vacancyData.data.vacancies.totalCount,
              });
            }

            const handleLoadMore = () =>
              vacancyData.loadMore(
                (prev, next) => ({
                  ...prev,
                  products: {
                    ...prev.vacancies,
                    edges: [...prev.vacancies.edges, ...next.vacancies.edges],
                    pageInfo: next.vacancies.pageInfo,
                  },
                }),
                {
                  after: vacancyData.data.vacancies.pageInfo.endCursor,
                },
              );

            return (
              <MetaWrapper
                meta={{
                  description: "The Database Kenya Jobs and vacancies",
                  title:
                    "The Database Kenya | jobs in Kenya | jobs need people",
                }}
              >
                <Page
                  clearFilters={clearFilters}
                  displayLoader={vacancyData.loading}
                  hasNextPage={
                    vacancyData.data?.vacancies?.pageInfo.hasNextPage
                  }
                  sortOptions={sortOptions}
                  activeSortOption={filters.sortBy}
                  filters={filters}
                  vacancies={vacancyData.data.vacancies}
                  onFiltersChange={onFiltersChange}
                  onLoadMore={handleLoadMore}
                  sort={sort}
                  onOrder={(value) => {
                    setSort(value.value);
                  }}
                />
              </MetaWrapper>
            );
          }}
        </TypedVacanciesQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
