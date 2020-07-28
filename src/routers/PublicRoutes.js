import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "pages/LandingPage";
import NotFound from "pages/NotFound";

const PublicRoutes = ({ deviceType }) => (
  <Fragment>
    <Switch>
      <Route exact path={`/`} component={LandingPage} deviceType={deviceType} />
      <Route component={NotFound} deviceType={deviceType} />
    </Switch>
  </Fragment>
);

export default PublicRoutes;
