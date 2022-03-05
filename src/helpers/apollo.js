import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { fromPromise, Observable } from "apollo-link";
import { onError } from "apollo-link-error";
import fetch from "isomorphic-unfetch";
import { BASE_GRAPHQL_URL, BASE_GRAPHQL_WS_URL } from "constants/constants";
import { setContext } from "apollo-link-context";
import { BatchHttpLink } from "apollo-link-batch-http";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split } from "@apollo/client";
import AuthService, {
  getRefreshToken,
  getToken,
} from "containers/Authentication/auth.service";

const auth = new AuthService();
// console.log(auth.fetchToken());

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
              />,
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

const linkOptions = {
  // credentials: "include", // Additional fetch() options like `credentials` or `headers`
  uri: BASE_GRAPHQL_URL, // Server URL (must be absolute)
};
const uploadLink = createUploadLink(linkOptions);
const batchLink = new BatchHttpLink({
  batchInterval: 20,
  batchMax: 10,
  ...linkOptions,
  fetch,
});
export const myClient = new SubscriptionClient(BASE_GRAPHQL_WS_URL, {
  reconnect: false,
  // connectionParams: {
  //   headers: {
  //     Authorization: getToken() ? `JWT ${getToken()}` : null,
  //   },
  // },
});

// myClient.onConnected(() => {
//   console.log("connected f client f onConnected");
// });
// myClient.onReconnected(() => {
//   console.log("connected f client f  reconnected");
// });
// myClient.onReconnecting(() => {
//   console.log("connected f client  f reconnecting");
// });
// myClient.onDisconnected(() => {
//   console.log("connected f client  f onDisconnected");
// });
// myClient.onError(() => {
//   console.log("connected f client  f onError");
// });

// const wsLink = new WebSocketLink(myClient);
const wsLink = new WebSocketLink({
  uri: BASE_GRAPHQL_WS_URL,
  options: {
    reconnect: false,
  },
});
// const wsLink = new WebSocketLink({
//   uri: BASE_GRAPHQL_WS_URL,
//   options: {
//     reconnect: true,
//     // connectionParams: {
//     //   headers: {
//     //     Authorization: getToken() ? `JWT ${getToken()}` : null,
//     //   },
//     // },
//   },
// });

const httpLink = ApolloLink.split(
  (operation) => operation.getContext().useBatching,
  batchLink,
  uploadLink,
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);
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

const authLink = tokenLink;
// const authLink = invalidateTokenLink.concat(tokenLink);

export const _promiseToObservable = (promiseFunc) =>
  new Observable((subscriber) => {
    promiseFunc.then(
      (value) => {
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      },
      (err) => subscriber.error(err),
    );
    return subscriber; // this line can removed, as per next comment
  });

// const inMemoryCacheOptions = {
//   addTypename: true,
//   typePolicies: {
//     Repository: {
//       fields: {
//         releases: {
//           keyArgs: false,
//           merge(existing, incoming) {
//             if (!incoming) return existing;
//             if (!existing) return incoming;

//             const { nodes, ...rest } = incoming;
//             // We only need to merge the nodes array.
//             // The rest of the fields (pagination) should always be overwritten by incoming
//             let result = rest;
//             result.nodes = [...existing.nodes, ...nodes];
//             return result;
//           },
//         },
//       },
//     },
//   },
// };
/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
export function createApolloClient(initialState = {}) {
  const client = new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      onError((error = {}) => {
        const {
          graphQLErrors = [],
          networkError = {},
          operation = {},
          forward,
          // location,
          // ...rest
        } = error || {};
        // console.log(graphQLErrors, networkError, operation, rest);
        // const { getContext } = operation || {};
        // const { scope, headers = {} } = getContext() || {};
        const { message: networkErrorMessage = "" } = networkError;
        const { message: graphQLErrorsMessage = "" } = graphQLErrors;
        const graphQLFailed = (message) =>
          typeof message === "string" &&
          message.startsWith("Problem with GraphQL API");
        const networkFailed = (message) =>
          typeof message === "string" &&
          message.startsWith("NetworkError when attempting to fetch resource");

        if (graphQLFailed(graphQLErrorsMessage)) return forward(operation);
        if (networkFailed(networkErrorMessage)) return forward(operation);
        if (networkError) {
          console.log(`[Network error]: `, networkError);
          // if you would also like to retry automatically on
          // network errors, we recommend that you use
          // apollo-link-retry
        }
        // TODO --- On error message invalid token clear local storage
        if (graphQLErrors && graphQLErrors.filter((e) => e).length > 0) {
          for (let err of graphQLErrors) {
            let isRefreshing = false;
            let pendingRequests = [];

            const resolvePendingRequests = () => {
              pendingRequests.map((callback) => callback());
              pendingRequests = [];
            };
            switch (err.extensions.exception.code) {
              case "JSONWebTokenExpired" || "UNAUTHENTICATED":
                const token = getToken();
                const refreshToken = getRefreshToken();
                if (token && refreshToken) {
                  let forward$;
                  if (!isRefreshing) {
                    isRefreshing = true;
                    forward$ = fromPromise(
                      auth
                        .fetchToken(client)
                        .then(({ data: { refreshToken } }) => {
                          resolvePendingRequests();
                          return refreshToken.token;
                        })
                        .catch((error) => {
                          // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                          console.log("Error after setting token: ", error);
                          pendingRequests = [];
                        })
                        .finally(() => {
                          isRefreshing = false;
                        }),
                    );
                  } else {
                    // Will only emit once the Promise is resolved
                    forward$ = fromPromise(
                      new Promise((resolve) => {
                        pendingRequests.push(() => resolve());
                      }),
                    );
                  }
                  return forward$.flatMap(() => {
                    const oldHeaders = operation.getContext().headers;
                    const token = getToken();

                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        Authorization: token ? `JWT ${token}` : null,
                      },
                    });
                    return forward(operation);
                  });
                } else {
                  // If there's no token, then sign out user
                  console.log("There's no token, sign out the user");
                  window.location.replace("/auth");
                }

                break;

              case "GraphQLError":
                toast.error("Internal Server Error");
                break;

              default:
                toast.error(err.extensions.exception.code);
                if (process.env.NODE_ENV !== "production") {
                  toast.error(err.message);
                }

                break;
            }
          }
        }
      }),
      authLink,
      link,
    ]),
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: process.env.NODE_ENV !== "production",
    shouldBatch: true,
  });
  return client;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
