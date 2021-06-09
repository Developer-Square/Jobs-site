import * as React from "react";
import { Query } from "react-apollo";

import { Error } from "components/Error";
import Loader from "components/Loader/Loader";
import { maybe } from "./utils";

export function TypedQuery(query) {
  return (props) => {
    const {
      children,
      displayError = true,
      displayLoader = true,
      renderOnError = false,
      alwaysRender = false,
      fetchPolicy = "cache-and-network",
      errorPolicy,
      loaderFull,
      skip,
      variables,
      onCompleted,
    } = props;
    return (
      <Query
        query={query}
        variables={variables}
        skip={skip}
        fetchPolicy={fetchPolicy}
        errorPolicy={errorPolicy}
        onCompleted={onCompleted}
      >
        {(queryData) => {
          const { error, loading, data, fetchMore } = queryData;
          const hasData = maybe(() => !!Object.keys(data).length, false);
          const loadMore = (mergeFunc, extraVariables) =>
            fetchMore({
              query,
              updateQuery: (previousResults, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return previousResults;
                }
                return mergeFunc(previousResults, fetchMoreResult);
              },
              variables: { ...variables, ...extraVariables },
            });

          if (displayError && error && !hasData) {
            return <Error error={error.message} />;
          }

          if (displayLoader && loading && !hasData) {
            return <Loader full={loaderFull} />;
          }

          if (hasData || (renderOnError && error) || alwaysRender) {
            return children({ ...queryData, loadMore });
          }

          return null;
        }}
      </Query>
    );
  };
}
