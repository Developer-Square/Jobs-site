import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const authentication = () =>
  JSON.parse(localStorage.getItem("thedatabase_auth_roles")) ? (
    <Redirect to="/app" />
  ) : (
    <PublicRoutes />
  );

function BaseRouter({ deviceType }) {
  return (
    <>
      <Switch>
        <Route path="/app" component={PrivateRoutes} deviceType={deviceType} />
        <Route path="" render={authentication} deviceType={deviceType} />
      </Switch>
    </>
  );
}

export default BaseRouter;
