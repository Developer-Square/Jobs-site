import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { Modal } from "@redq/reuse-modal";
import AppLayout from "containers/LayoutContainer/AppLayout";
import { AuthContext } from "contexts/auth/auth.context";
import { withApollo } from "helpers/apollo";

function BaseRouter({ deviceType }) {
  const { isAuthenticated } = useContext(AuthContext);
  const authentication = () =>
    isAuthenticated ? (
      <Redirect to="/dashboard" deviceType={deviceType} />
    ) : (
      <PublicRoutes deviceType={deviceType} />
    );
  return (
    <>
      <Switch>
        <Route
          path="/dashboard"
          render={(props) => (
            <PrivateRoutes deviceType={deviceType} {...props} />
          )}
        />

        <AppLayout deviceType={deviceType}>
          <Route path="/" render={authentication} />
          <Modal />
        </AppLayout>
      </Switch>
    </>
  );
}

export default withApollo(BaseRouter);
