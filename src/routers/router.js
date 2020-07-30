import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

function BaseRouter({ deviceType }) {
  console.log("device t", deviceType);
  const authentication = (deviceType) =>
    JSON.parse(localStorage.getItem("thedatabase_auth_roles")) ? (
      <Redirect to="/app" deviceType={deviceType} />
    ) : (
      <PublicRoutes deviceType={deviceType} />
    );
  return (
    <>
      <Switch>
        <Route path="/app" component={PrivateRoutes} deviceType={deviceType} />
        <Route path="" render={authentication} />
      </Switch>
    </>
  );
}

export default BaseRouter;
