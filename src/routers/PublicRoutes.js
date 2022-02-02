import React, { Fragment, lazy, Suspense } from "react";
import { Switch } from "react-router-dom";

import Loader from "components/Loader/Loader";
import * as ROUTE from "constants/routes.constants";
import PublicRoute from "./PublicRoute";
import ProfileView from "pages/Profile/ProfileView";
import BillingTest from "pages/BillingTest/BillingTest";
import SeekerProfileTest from "pages/SeekerProfileTest/SeekerProfileTest";
import ApplicationForm from "pages/Vacancy/ApplicationForm";

const LandingPage = lazy(() => import("pages/LandingPage"));
const NotFound = lazy(() => import("pages/NotFound"));
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
const Vacancies = lazy(() => import("pages/Vacancies/View"));
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
        path={`/billing-test`}
        component={BillingTest}
      />
      <PublicRoute
        restricted={false}
        exact
        path={`/seeker-profile-test`}
        component={SeekerProfileTest}
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
        path={`${ROUTE.VACANCIES}/:vacancyID/application`}
        component={ApplicationForm}
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
        path={`${ROUTE.PROFILE}/:profileID`}
        component={ProfileView}
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
