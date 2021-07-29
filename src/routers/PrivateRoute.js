import React, { Suspense } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import Loader from "components/Loader/Loader";

import { checkAuth } from "./utils";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? (
          <Suspense fallback={<Loader />}>
            <Component {...props} />
          </Suspense>
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
