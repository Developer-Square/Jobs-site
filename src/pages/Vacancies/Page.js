import React from "react";
import Vacancy from "./Vacancy";

const Page = ({ displayLoader, hasNextPage, onLoadMore, vacancies, onFiltersChange }) => {
  return (
    <Vacancy
      vacancies={vacancies.edges.map((edge) => edge.node)}
      canLoadMore={hasNextPage}
      loading={displayLoader}
      onLoadMore={onLoadMore}
      onFiltersChange={onFiltersChange}
    />
  );
};

export default Page;
