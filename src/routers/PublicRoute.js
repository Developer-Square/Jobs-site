import React, { useContext, Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "contexts/auth/auth.context";

import Loader from "components/Loader/Loader";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        restricted ? (
          isAuthenticated ? (
            <Suspense fallback={<Loader />}>
              <Component {...props} {...rest} />
            </Suspense>
          ) : (
            <Redirect
              push
              to="/auth"
              // to={{
              //   pathname: "/auth",
              //   state: { referrer: `${props.location.pathname}` },
              // }}
            />
          )
        ) : (
          <Suspense fallback={<Loader />}>
            <Component {...props} {...rest} />
          </Suspense>
        )
      }
    />
  );
};

export default PublicRoute;
