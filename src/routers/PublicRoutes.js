import React, { Fragment, lazy, Suspense } from "react";
import { Switch } from "react-router-dom";

import Loader from "components/Loader/Loader";
import * as ROUTE from "constants/routes.constants";
import TermsOfUse from "pages/TOS/SDG";
import Help from "pages/Help/Help";
import { SamplePage } from "pages/sample";
import Authentication from "pages/Authentication";
import PasswordReset from "containers/Authentication/PasswordReset";
import EmailActivation from "containers/Authentication/EmailActivation";
import Vacancies from "pages/Vacancies/Vacancy";
import Categories from "pages/Categories";
import Pricing from "pages/Pricing";
import Contact from "pages/Contact";

import PublicRoute from "./PublicRoute";

const LandingPage = lazy(() => import("pages/LandingPage"));
const NotFound = lazy(() => import("pages/NotFound"));
const EmailVerification = lazy(() =>
  import("containers/SignInOutForm/emailVerification"),
);
const PrivacyPolicy = lazy(() => import("pages/TOS/PrivacyPolicy"));
const About = lazy(() => import("pages/About/about"));
const TermsOfUse = lazy(() => import("pages/TOS/SDG"));
const Help = lazy(() => import("pages/Help/Help"));
const Authentication = lazy(() => import("pages/Authentication"));
const PasswordReset = lazy(() =>
  import("containers/Authentication/PasswordReset"),
);
const EmailActivation = lazy(() =>
  import("containers/Authentication/EmailActivation"),
);
const Vacancies = lazy(() => import("pages/Vacancies"));
const Categories = lazy(() => import("pages/Categories"));
const Pricing = lazy(() => import("pages/Pricing"));
const Contact = lazy(() => import("pages/Contact"));

const VacancyView = lazy(() => import("pages/Vacancy/VacancyView"));
const ResumeView = lazy(() => import("pages/Resume/view"));


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
        path={`${match.path}/p/:userType([A-Za-z0-9]+)`}
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
        path={`${match.path}/activate`}
        component={EmailActivation}
      />
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
        <Suspense fallback={<Loader />}>
          <LandingPage deviceType={deviceType} />
        </Suspense>
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
        path={`${ROUTE.RESUME}/:resumeID`}
        component={ResumeView}
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
