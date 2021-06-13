import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import decode from "jwt-decode";
import { millisecondsToDaysHoursMinutesSeconds } from "helpers";

const checkAuth = () => {
  const payload = JSON.parse(localStorage.getItem("thedb_auth_payload"));
  if (payload === undefined || payload === null) {
    return false;
  }
  const accessToken = payload.token;
  const refreshToken = payload.refreshToken;

  if (!accessToken || !refreshToken) {
    return false;
  }

  try {
    const { exp } = decode(accessToken);
    const { days, hours, minutes, seconds } =
      millisecondsToDaysHoursMinutesSeconds(exp);
    console.log(
      `Token Expires in: ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`
    );

    if (Date.now >= exp * 1000) {
      return false;
    }
  } catch (error) {
    console.log(`${JSON.stringify(error, null, 2)}`);
  }
  return true;
};
const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? (
          <Component deviceType={rest.deviceType} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "auth/",
              state: { referrer: `dashboard/${path}` },
            }}
          />
        )
      }
    />
  );
};

export default withRouter(PrivateRoute);
