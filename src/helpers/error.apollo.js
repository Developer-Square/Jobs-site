import { fromPromise, Observable } from "apollo-link";
import { onError } from "apollo-link-error";
import { removeTokens } from "helpers";
import { getToken, getRefreshToken } from "./apollo.utils";
import AuthService from "containers/Authentication/auth.service";

const auth = new AuthService();

console.log(auth.fetchToken());
export function findValueInEnum(needle, haystack) {
  const match = Object.entries(haystack).find(([_, value]) => value === needle);
  if (!match) {
    throw new Error(`Value ${needle} not found in enum`);
  }
  return needle;
}
export var JWTError;
(function (JWTError) {
  JWTError["invalid"] = "InvalidTokenError";
  JWTError["invalidSignature"] = "InvalidSignatureError";
  JWTError["expired"] = "JSONWebTokenExpired";
})(JWTError || (JWTError = {}));
export function isJwtError(error) {
  let jwtError;
  try {
    jwtError = !!findValueInEnum(error.extensions.exception.code, JWTError);
  } catch (e) {
    jwtError = false;
  }
  return jwtError;
}
export function isTokenExpired(error) {
  return error.extensions.exception.code === JWTError.expired;
}

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

export const _promiseToObservable = (promiseFunc) =>
  new Observable((subscriber) => {
    promiseFunc.then(
      (value) => {
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      },
      (err) => subscriber.error(err)
    );
    return subscriber; // this line can removed, as per next comment
  });

export const errorLink = (client) => {
  return onError((error = {}) => {
    const {
      graphQLErrors = [],
      networkError = {},
      operation = {},
      forward,
      location,
      ...rest
    } = error || {};
    console.log(rest);
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

    console.log("On error");
    console.log(graphQLErrors, networkError, rest);
    // TODO --- On error message invalid token clear local storage
    if (graphQLErrors && graphQLErrors.filter((e) => e).length > 0) {
      console.log("Errors: ", graphQLErrors);
      for (let err of graphQLErrors) {
        let isRefreshing = false;
        let pendingRequests = [];

        const resolvePendingRequests = () => {
          pendingRequests.map((callback) => callback());
          pendingRequests = [];
        };
        console.log(err.extensions.exception.code);
        switch (err.extensions.exception.code) {
          case "JSONWebTokenExpired" || "UNAUTHENTICATED":
            console.log("err.extensions.code");
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
                      console.log("Promise data: ", refreshToken);
                      // localStorage.setItem("token", refreshToken.token);
                      // localStorage.setItem(
                      //   "refreshToken",
                      //   refreshToken.refreshToken
                      // );
                      resolvePendingRequests();
                      return refreshToken.token;
                    })
                    .catch((error) => {
                      // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                      console.log("Error after setting token: ", error);
                      pendingRequests = [];
                    })
                    .finally(() => {
                      console.log("Finally");
                      isRefreshing = false;
                    })
                ).filter((value) => {
                  console.log("In Filter: ", value);
                  return Boolean(value);
                });
              } else {
                // Will only emit once the Promise is resolved
                forward$ = fromPromise(
                  new Promise((resolve) => {
                    pendingRequests.push(() => resolve());
                  })
                );
              }
              return forward$.flatMap(() => {
                console.log("Forwarding!");
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: getToken(),
                  },
                });
                return forward(operation);
              });
            }
            // else {
            //   // If there's no token, then sign out user
            //   console.log("There's no token, sign out the user", signOut);
            //   signOut();
            // }

            break;
          default:
            break;
        }
      }
      // graphQLErrors.map(({ message, status }) => {
      //   console.log("Message: ", message);
      //   console.log("Status: ", status);
      //   console.log("Location: ", location);
      //   if (message.includes("You do not have permission")) {
      //     const token = getToken();
      //     const refreshToken = getRefreshToken();
      //     console.log("Token, refresh", token, refreshToken);
      //     if (token && refreshToken) {
      //       console.log("In if condition");
      //       // error code is set to UNAUTHENTICATED
      //       // when AuthenticationError thrown in resolver
      //       let forward$;
      //       if (!isRefreshing) {
      //         isRefreshing = true;
      //         forward$ = fromPromise(
      //           // getNewToken(client)
      //           getNewToken()
      //             .then(({ data: { refreshToken } }) => {
      //               console.log("Promise data: ", refreshToken);
      //               // localStorage.setItem("token", refreshToken.token);
      //               // localStorage.setItem(
      //               //   "refreshToken",
      //               //   refreshToken.refreshToken
      //               // );
      //               resolvePendingRequests();
      //               return refreshToken.token;
      //             })
      //             .catch((error) => {
      //               // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
      //               console.log("Error after setting token: ", error);
      //               pendingRequests = [];
      //               return;
      //             })
      //             .finally(() => {
      //               console.log("Finally");
      //               isRefreshing = false;
      //             })
      //         ).filter((value) => {
      //           console.log("In Filter: ", value);
      //           return Boolean(value);
      //         });
      //       } else {
      //         // Will only emit once the Promise is resolved
      //         forward$ = fromPromise(
      //           new Promise((resolve) => {
      //             pendingRequests.push(() => resolve());
      //           })
      //         );
      //       }
      //       return forward$.flatMap(() => {
      //         console.log("Forwarding!");
      //         const oldHeaders = operation.getContext().headers;
      //         operation.setContext({
      //           headers: {
      //             ...oldHeaders,
      //             authorization: getNewToken(),
      //           },
      //         });
      //         return forward(operation);
      //       });
      //     }
      //     // else {
      //     //   // If there's no token, then sign out user
      //     //   console.log("There's no token, sign out the user", signOut);
      //     //   signOut();
      //     // }
      //   }
      //   throw new Error(`Error in handling graphql Errors. Check Dev code`);
      // });
    }
  });
};
