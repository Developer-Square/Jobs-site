import { removeTokens } from "helpers";
import { GET_TOKEN_MUTATION } from "containers/Authentication/mutations";
import { addObjectToLocalStorageObject } from "helpers";
import { getHook } from "hooks";
import { toast } from "react-toastify";

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

    if (f) {
      if (f.mutate) {
        const fetchRefreshToken = f.mutate({
          mutation: GET_TOKEN_MUTATION,
          variables: { refreshToken: getRefreshToken() },
        });
        if (getRefreshToken()) {
          return fetchRefreshToken
            .then((res) => {
              // extract token from the response data and return it

              const {
                data: {
                  refreshToken: { success, token, refreshToken },
                },
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
                toast("Login again to continue");
                historyHook.push("/auth");
              }

              return token;
            })
            .catch((err) => {
              toast("Login again to continue");
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
    return null;
  }
}
AuthService.displayName = "AuthService";
export default AuthService;
