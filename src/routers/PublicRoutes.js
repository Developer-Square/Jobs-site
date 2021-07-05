import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
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
import PublicRoute from "./PublicRoute";
import VacancyView from "pages/Vacancy/VacancyView";

const AuthRoutes = (props) => {
  const { match } = props;
  return (
    <Switch>
      <PublicRoute
        restricted={false}
        exact
        path={`${match.path}`}
        component={Authentication}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${match.path}/:userType([A-Za-z0-9]+)`}
        component={Authentication}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${match.path}/email-verify`}
        component={EmailVerification}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${match.path}/password-reset/:resetToken`}
        component={PasswordReset}
      />
      {/* <PublicRoute restricted={false} exact path={`${match.path}/activate`} component={EmailVerification} /> */}
      <PublicRoute
        restricted={false}
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
      <PublicRoute restricted={false} exact path={ROUTE.LANDING}>
        <LandingPage deviceType={deviceType} />
      </PublicRoute>
      <PublicRoute
        restricted={false}
        path={ROUTE.AUTH}
        component={AuthRoutes}
      />

      <PublicRoute
        restricted={false}
        exact
        path={`${ROUTE.TOS}`}
        component={PrivacyPolicy}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${ROUTE.ABOUT}`}
        component={About}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${ROUTE.SDG}`}
        component={TermsOfUse}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${ROUTE.HELP_PAGE}`}
        component={Help}
      />
      <PublicRoute
        restricted={true}
        exact
        path={`/sample`}
        component={SamplePage}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${ROUTE.VACANCIES}`}
        component={Vacancies}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${ROUTE.VACANCIES}/:vacancyID`}
        component={VacancyView}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${ROUTE.CATEGORIES}`}
        component={Categories}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${ROUTE.CONTACT}`}
        component={Contact}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`${ROUTE.PRICING}`}
        component={Pricing}
      />
      <PublicRoute
        restricted={false}
        component={NotFound}
        deviceType={deviceType}
      />
    </Switch>
  </Fragment>
);

export default PublicRoutes;
