import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "pages/LandingPage";
import NotFound from "pages/NotFound";
import EmailVerification from "containers/SignInOutForm/emailVerification";

const PublicRoutes = ({ deviceType }) => (
  <Fragment>
    <Switch>
      <Route exact path={`/`}>
        <LandingPage deviceType={deviceType} />
      </Route>
      <Route exact path={`/activate`} component={EmailVerification} />
      {/* <Route exact path={`/activate/:emailToken`} component={EmailActivation} />
      <Route exact path={`/login`} component={Login} />
      <Route exact path={`/signup`} component={Signup} />
      <Route exact path={`/password-reset`} component={PasswordResetEmail} />
      <Route
        exact
        path={`/password-reset/:resetToken`}
        component={PasswordReset}
      /> */}
      <Route component={NotFound} deviceType={deviceType} />
    </Switch>
  </Fragment>
);

export default PublicRoutes;
