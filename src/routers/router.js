import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { Modal } from "@redq/reuse-modal";
import AppLayout from "containers/LayoutContainer/AppLayout";
import { AuthContext } from "contexts/auth/auth.context";

function BaseRouter({ deviceType }) {
  const { isAuthenticated } = useContext(AuthContext);
  const authentication = (deviceType) =>
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
          component={PrivateRoutes}
          deviceType={deviceType}
        />

        <AppLayout deviceType={deviceType}>
          <Modal>
            <Route path="" render={authentication} />
          </Modal>
        </AppLayout>
      </Switch>
    </>
  );
}

export default BaseRouter;
