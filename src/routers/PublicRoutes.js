import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "pages/LandingPage";
import NotFound from "components/NotFound";

const PublicRoutes = ({ match }) => (
  <Fragment>
    <Switch>
      <Route exact path={`/`} component={LandingPage} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default PublicRoutes;
