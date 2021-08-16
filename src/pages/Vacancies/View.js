import * as React from "react";

import { StringParam, useQueryParam } from "use-query-params";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import MetaWrapper from "components/Meta/MetaWrapper";
import NetworkStatus from "components/NetworkStatus";
import Page from "./Page";
import { TypedVacanciesQuery } from "./queries";
import { NoResult } from "components/VacancyLoader/VacancyLoader.style";
import Loader from "components/Loader/Loader";
import { vacancyLimit } from "constants/constants";

// export const FilterQuerySet = {
//   encode(valueObj) {
//     const str = [];
//     Object.keys(valueObj).forEach((value) => {
//       str.push(`${value}_${valueObj[value].join("_")}`);
//     });
//     return str.join(".");
//   },

//   decode(strValue) {
//     const obj = {};
//     const propsWithValues = strValue.split(".").filter((n) => n);
//     propsWithValues.map((value) => {
//       const propWithValues = value.split("_").filter((n) => n);
//       obj[propWithValues[0]] = propWithValues.slice(1);
//       return obj;
//     });
//     return obj;
//   },
// };

export const View = ({ match, deviceType }) => {
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    // FilterQuerySet,
  );

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
    {
      label: "Last updated Ascending",
      value: "updated_at",
    },
    {
      label: "Price High-Low",
      value: "-updated_at",
    },
  ];

  const variables = {
    ...filters,
    sortBy: {
      "field": "SALARY",
      "direction": "DESC"
    },
  };

  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedVacanciesQuery variables={variables} errorPolicy="all" loaderFull>
          {(vacancyData) => {
            console.log(vacancyData)
            if (vacancyData.loading) {
              return <Loader />;
            }

            if (vacancyData.data && vacancyData.data.vacancies === null) {
              return <NoResult />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
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
                  title: "The Database Kenya | jobs in Kenya | jobs need people",
                }}
              >
                <Page
                  clearFilters={clearFilters}
                  displayLoader={vacancyData.loading}
                  hasNextPage={vacancyData.data?.products?.pageInfo.hasNextPage}
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
