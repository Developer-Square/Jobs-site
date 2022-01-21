import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { Modal } from "@redq/reuse-modal";
import AppLayout from "layouts/AppLayout";
import { AuthContext } from "contexts/auth/auth.context";
import { withApollo } from "helpers/apollo";
import Wrapper from "components/shared/Wrapper";
import SplitScreen from "pages/LandingPage/SplitScreen";
import UserContext from "contexts/user/user.provider";

function BaseRouter({ deviceType }) {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  const { userType } = useContext(UserContext);
  const authentication = (props) =>
    isAuthenticated ? (
      <PrivateRoutes deviceType={deviceType} {...props} />
    ) : (
      <Redirect to="/auth" deviceType={deviceType} />
    );

  return (
    <Wrapper>
      <Switch>
        <Route path="/dashboard" render={authentication} />

        {userType === "Seeker" || userType === "Employer" ? (
          <AppLayout deviceType={deviceType}>
            <Route
              path="/"
              render={(props) => (
                <PublicRoutes deviceType={deviceType} {...props} />
              )}
            />
            <Modal />
          </AppLayout>
        ) : (
          <SplitScreen deviceType={deviceType} />
        )}
      </Switch>
    </Wrapper>
  );
}

export default withApollo(BaseRouter);
