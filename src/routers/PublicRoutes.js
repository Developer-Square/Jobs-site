import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "pages/LandingPage";
import NotFound from "pages/NotFound";
import EmailVerification from "containers/SignInOutForm/emailVerification";
import PrivacyPolicy from "pages/TOS/PrivacyPolicy";
import About from "pages/About/about";
import * as ROUTE from "constants/routes.constants";
import TermsOfUse from "pages/TOS/SDG";
import Help from "pages/Help/Help";
import { SamplePage } from "pages/sample";
import Authentication from "pages/Authentication";
import PasswordReset from "containers/Authentication/PasswordReset";
import EmailActivation from "containers/Authentication/EmailActivation";
import Vacancies from "pages/Vacancies";
import Categories from "pages/Categories";
import Pricing from "pages/Pricing";
import Contact from "pages/Contact";

const AuthRoutes = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={Authentication} />
      <Route
        exact
        path={`${match.path}/email-verify`}
        component={EmailVerification}
      />
      <Route
        exact
        path={`${match.path}/password-reset/:resetToken`}
        component={PasswordReset}
      />
      {/* <Route exact path={`${match.path}/activate`} component={EmailVerification} /> */}
      <Route
        exact
        path={`${match.path}/activate/:emailToken`}
        component={EmailActivation}
      />
    </Switch>
  );
};
const PublicRoutes = ({ deviceType }) => (
  <Fragment>
    <Switch>
      <Route exact path={`/`}>
        <LandingPage deviceType={deviceType} />
      </Route>
      <Route path={`/auth`} component={AuthRoutes} />

      <Route exact path={`${ROUTE.TOS}`} component={PrivacyPolicy} />
      <Route exact path={`${ROUTE.ABOUT}`} component={About} />
      <Route exact path={`${ROUTE.SDG}`} component={TermsOfUse} />
      <Route exact path={`${ROUTE.HELP_PAGE}`} component={Help} />
      <Route exact path={`/sample`} component={SamplePage} />
      <Route exact path={`${ROUTE.VACANCIES}`} component={Vacancies} />
      <Route exact path={`${ROUTE.CATEGORIES}`} component={Categories} />
      <Route exact path={`${ROUTE.CONTACT}`} component={Contact} />
      <Route exact path={`${ROUTE.PRICING}`} component={Pricing} />
      <Route component={NotFound} deviceType={deviceType} />
    </Switch>
  </Fragment>
);

export default PublicRoutes;
