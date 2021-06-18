import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";

import fetch from "isomorphic-unfetch";
import { BASE_GRAPHQL_URL } from "constants/constants";
import { setContext } from "apollo-link-context";
import { BatchHttpLink } from "apollo-link-batch-http";
import { createUploadLink } from "apollo-upload-client";
import { isJwtError, JWTError } from "./error.apollo";
import { removeTokens } from "helpers";

let apolloClient = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initializeApollo(apolloState); //"https://thedb.hewani.io/graphql/"
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initializeApollo());

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Helmet.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */

function initializeApollo(initialState = null) {
  // const _apolloClient = apolloClient !== null && apolloClient !== void 0 ? apolloClient : createApolloClient();
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") return _apolloClient;

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = createApolloClient();

  return _apolloClient;
}

function getToken() {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken === null || accessToken === undefined) {
    return false;
  } else {
    return accessToken;
  }
}

const linkOptions = {
  // credentials: "include", // Additional fetch() options like `credentials` or `headers`
  uri: BASE_GRAPHQL_URL, // Server URL (must be absolute)
};
const uploadLink = createUploadLink(linkOptions);
const batchLink = new BatchHttpLink({
  batchInterval: 100,
  ...linkOptions,
  fetch,
});

const link = ApolloLink.split(
  (operation) => operation.getContext().useBatching,
  batchLink,
  uploadLink
);

export const invalidateTokenLink = onError((error) => {
  if (
    (error.networkError && error.networkError.statusCode === 401) ||
    error.graphQLErrors?.some(isJwtError)
  ) {
    if (error.graphQLErrors[0].extensions.code !== JWTError.expired) {
      removeTokens();
    }
  }
});

export const tokenLink = setContext((_, context) => {
  const authToken = getToken();

  return {
    ...context,
    headers: {
      ...context.headers,
      Authorization: authToken ? `JWT ${authToken}` : null,
    },
  };
});

const authLink = invalidateTokenLink.concat(tokenLink);

const errorLink = onError((error) => {
  const {
    graphQLErrors = [],
    networkError = {},
    operation = {},
    forward,
  } = error || {};
  // const { getContext } = operation || {};
  // const { scope, headers = {} } = getContext() || {};
  const { message: networkErrorMessage = "" } = networkError || {};
  const { message: graphQLErrorsMessage = "" } = graphQLErrors || [];
  const graphQLFailed = (message) =>
    typeof message === "string" &&
    message.startsWith("Problem with GraphQL API");
  const networkFailed = (message) =>
    typeof message === "string" &&
    message.startsWith("NetworkError when attempting to fetch resource");

  if (graphQLFailed(graphQLErrorsMessage)) return forward(operation);
  if (networkFailed(networkErrorMessage)) return forward(operation);
});

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(authLink.concat(link)),
    cache: new InMemoryCache().restore(initialState),
  });
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
