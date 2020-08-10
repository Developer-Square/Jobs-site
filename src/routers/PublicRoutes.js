import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "pages/LandingPage";
import NotFound from "pages/NotFound";
import EmailVerification from "containers/SignInOutForm/emailVerification";
import PrivacyPolicy from "pages/TOS/PrivacyPolicy";
import About from "pages/About/about";
import { TOS, ABOUT } from "constants/routes.constants";

const PublicRoutes = ({ deviceType }) => (
  <Fragment>
    <Switch>
      <Route exact path={`/`}>
        <LandingPage deviceType={deviceType} />
      </Route>
      <Route exact path={`/activate`} component={EmailVerification} />
      <Route exact path={`${TOS}`} component={PrivacyPolicy} />
      <Route exact path={`${ABOUT}`} component={About} />
      <Route component={NotFound} deviceType={deviceType} />
    </Switch>
  </Fragment>
);

export default PublicRoutes;
