import * as React from "react";

import { StringParam, useQueryParam } from "use-query-params";
import { MetaWrapper, OfflinePlaceholder } from "components";
import NetworkStatus from "components/NetworkStatus";
import { convertSortByFromString } from "core/utils";
import Page from "./Page";
import { TypedVacanciesQuery } from "./queries";
import { NoResult } from "components/VacancyLoader/VacancyLoader.style";
import Loader from "components/Loader/Loader";

const VACANCIES_PER_PAGE = 10;
export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach((value) => {
      str.push(`${value}_${valueObj[value].join("_")}`);
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue.split(".").filter((n) => n);
    propsWithValues.map((value) => {
      const propWithValues = value.split("_").filter((n) => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
      return obj;
    });
    return obj;
  },
};

export const View = ({ match, deviceType }) => {
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet,
  );
  console.log("attribute", attributeFilters);

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
    pageSize: VACANCIES_PER_PAGE,
    search: "",
    ids: [],
    industries: [],
  };
  const variables = {
    ...filters,
    sortBy: convertSortByFromString(filters.sortBy),
    countryCode: "KE",
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
                  title: "jobs in Kenya",
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
