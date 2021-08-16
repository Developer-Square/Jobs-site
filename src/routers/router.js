import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { Modal } from "@redq/reuse-modal";
import AppLayout from "layouts/AppLayout";
import { AuthContext } from "contexts/auth/auth.context";
import { withApollo } from "helpers/apollo";
import Wrapper from "components/shared/Wrapper";

function BaseRouter({ deviceType }) {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
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

        <AppLayout deviceType={deviceType}>
          <Route
            path="/"
            render={(props) => (
              <PublicRoutes deviceType={deviceType} {...props} />
            )}
          />
          <Modal />
        </AppLayout>
      </Switch>
    </Wrapper>
  );
}

export default withApollo(BaseRouter);
