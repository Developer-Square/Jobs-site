import { useEffect } from "react";
import { useQuery as useBaseQuery } from "react-apollo";

import { isJwtError, isTokenExpired } from "helpers/error.apollo";
import { toast } from "react-toastify";
import UserContext from "contexts/user/user.provider";
import { useContext } from "react";

export async function handleQueryAuthError(error, tokenRefresh, logout) {
  if (error.graphQLErrors.some(isJwtError)) {
    if (error.graphQLErrors.every(isTokenExpired)) {
      const success = await tokenRefresh();

      if (!success) {
        logout();
        toast.error(
          "Your session has expired. Please log in again to continue.",
        );
      }
    } else {
      logout();
      toast.error("TheDatabase Kenya ran into an unexpected problem");
    }
  } else if (
    !error.graphQLErrors.every(
      (err) => err.extensions?.exception?.code === "PermissionDenied",
    )
  ) {
    toast.error("TheDatabase Kenya ran into an unexpected problem");
  }
}

function makeQuery(query) {
  function useQuery({ displayLoader, skip, variables }) {
    const { user } = useContext(UserContext);

    const queryData = useBaseQuery(query, {
      context: {
        useBatching: true,
      },
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: (error) =>
        handleQueryAuthError(error, user.tokenRefresh, user.logout),
      skip,
      variables: variables,
    });

    useEffect(() => {
      if (displayLoader) {
        toast("hold on while we process ...");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryData.loading]);

    const loadMore = (mergeFunc, extraVariables) =>
      queryData.fetchMore({
        query,
        updateQuery: (previousResults, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResults;
          }
          return mergeFunc(previousResults, fetchMoreResult);
        },
        variables: { ...variables, ...extraVariables },
      });

    return {
      ...queryData,
      loadMore,
    };
  }

  return useQuery;
}

export default makeQuery;
