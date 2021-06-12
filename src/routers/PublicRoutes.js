import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "pages/LandingPage";
import NotFound from "pages/NotFound";
import EmailVerification from "containers/SignInOutForm/emailVerification";
import PrivacyPolicy from "pages/TOS/PrivacyPolicy";
import About from "pages/About/about";
import { TOS, ABOUT, SDG, HELP_PAGE } from "constants/routes.constants";
import TermsOfUse from "pages/TOS/SDG";
import Help from "pages/Help/Help";
import { SamplePage } from "pages/sample";
import Authentication from "pages/Authentication";

const PublicRoutes = ({ deviceType }) => (
  <Fragment>
    <Switch>
      <Route exact path={`/`}>
        <LandingPage deviceType={deviceType} />
      </Route>
      <Route exact path={`/auth`} component={Authentication} />
      <Route exact path={`/auth/email-verify/`} component={EmailVerification} />
      <Route exact path={`${TOS}`} component={PrivacyPolicy} />
      <Route exact path={`${ABOUT}`} component={About} />
      <Route exact path={`${SDG}`} component={TermsOfUse} />
      <Route exact path={`${HELP_PAGE}`} component={Help} />
      <Route exact path={`/sample`} component={SamplePage} />
      <Route component={NotFound} deviceType={deviceType} />
    </Switch>
  </Fragment>
);

export default PublicRoutes;
