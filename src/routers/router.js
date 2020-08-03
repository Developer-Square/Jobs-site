import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { Modal } from "@redq/reuse-modal";
import AppLayout from "containers/LayoutContainer/AppLayout";

function BaseRouter({ deviceType }) {
  const authentication = (deviceType) =>
    localStorage.getItem("thedb_auth_roles") ? (
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
