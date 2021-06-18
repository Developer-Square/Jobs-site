import { AuthContext } from "contexts/auth/auth.context";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

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
            <Component {...props} />
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
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
