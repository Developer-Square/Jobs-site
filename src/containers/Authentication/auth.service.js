import { removeTokens } from "helpers";
import { GET_TOKEN_MUTATION } from "containers/Authentication/mutations";
import { addObjectToLocalStorageObject } from "helpers";
import { getHook } from "hooks";
import { useAlert } from "react-alert";
import React, { Fragment } from "react";

export const ShowNotification = (props) => {
  const alert = useAlert();
  console.log(props);
  const f = () => {
    console.log("almost handling notification");
    alert.show(
      {
        title: "Login again to continue",
      },
      { type: "error", timeout: 5000 }
    );
    return <Fragment />;
  };
  return f();
};

export function getRefreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken === null || refreshToken === undefined) {
    return false;
  } else {
    return refreshToken;
  }
}

export function getToken() {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken === null || accessToken === undefined) {
    return false;
  } else {
    return accessToken;
  }
}

export class AuthService {
  constructor() {
    this.fetchToken = this.fetchToken.bind(this);
  }
  fetchToken(f) {
    const historyHook = getHook("historyHook");

    console.log(f);
    console.log("this.props", this.props);
    if (f) {
      if (f.mutate) {
        console.log("at f.mutate");
        const fetchRefreshToken = f.mutate({
          mutation: GET_TOKEN_MUTATION,
          variables: { refreshToken: getRefreshToken() },
        });
        if (getRefreshToken()) {
          console.log("refreshing token");
          return fetchRefreshToken
            .then((res) => {
              // extract token from the response data and return it
              console.log("response", res);

              const {
                data: { success, token, refreshToken },
              } = res;
              if (success) {
                removeTokens();
                localStorage.setItem("access_token", token);
                localStorage.setItem("refresh_token", refreshToken);
                addObjectToLocalStorageObject("thedb_auth_payload", {
                  refreshToken: refreshToken,
                  token: token,
                });
              } else {
                // ShowNotification();
                alert("Login again to continue");
                historyHook.push("/auth");
              }

              return res;
            })
            .catch((err) => {
              console.log(err);
              // ShowNotification();
              alert("Login again to continue");
              historyHook.push("/auth");
            });
        } else {
          historyHook.push("/auth");
          // throw new Error(`refreshToken not found in localStorage`);
        }
      } else {
        throw new Error(`Provide "Apollo Client" to fetch refreshToken`);
      }
    }

    console.log(f);
    console.log("this.props");
    return null;
  }
}
AuthService.displayName = "AuthService";
export default AuthService;
