import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as ROUTES from "constants/routes.constants";
import Dashboard from "pages/Dashboard/Dashboard";
import NotFound from "components/NotFound";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import LandingPage from "pages/LandingPage";

const authentication = () =>
  JSON.parse(localStorage.getItem("kiu_auth_roles")) ? (
    <Redirect to="/app" />
  ) : (
    <PublicRoutes />
  );

function BaseRouter() {
  return (
    <>
      <Switch>
        <Route path={`/`} component={LandingPage} />
        <Route path={`${ROUTES.DASHBOARD}`} component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
      <Switch>
        <Route path="/app" component={PrivateRoutes} />
        <Route path="" render={authentication} />
      </Switch>
    </>
  );
}

export default BaseRouter;
