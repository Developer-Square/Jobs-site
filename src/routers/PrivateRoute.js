import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { checkAuth } from "./utils";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            push
            to={{
              pathname: "/auth",
              state: { referrer: `dashboard/${path}` },
            }}
          />
        )
      }
    />
  );
};

export default withRouter(PrivateRoute);
