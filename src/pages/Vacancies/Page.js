import React from "react";
import Vacancy from "./Vacancy";
const Page = ({ displayLoader, hasNextPage, onLoadMore, vacancies }) => {
  return (
    <Vacancy
      vacancies={vacancies.edges.map((edge) => edge.node)}
      canLoadMore={hasNextPage}
      loading={displayLoader}
      onLoadMore={onLoadMore}
    />
  );
};

export default Page;
