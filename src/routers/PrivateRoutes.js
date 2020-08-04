import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { uniqBy } from "lodash";
import { rolesConfig } from "constants/roles.constants";
import * as Routes from "./PrivateRoutes.config";
// import Navigation from "containers/Navigation/Navigation";
import PrivateRoute from "./PrivateRoute";
import { Modal } from "@redq/reuse-modal";
import DashboardLayout from "containers/LayoutContainer/DashboardLayout";
import NotFound from "pages/NotFound";
class PrivateRoutes extends Component {
  state = { allowedRoutes: [] };

  componentDidMount() {
    /*
      TODO: Replace hardcoded roles with API,
      contextAPI, localStorage, or get from server.
     */
    let roles = localStorage.getItem("thedb_auth_roles");
    if (roles) {
      roles = ["common", roles];
      console.log("roles", roles);
      let allowedRoutes = roles.reduce((acc, role) => {
        console.log("role", role);
        return [acc, rolesConfig[role].routes];
      }, []);
      console.log("allowed routes", allowedRoutes[1]);

      // For removing duplicate entries, compare with 'url'.
      allowedRoutes = uniqBy(allowedRoutes[1], "url");
      this.setState({ allowedRoutes });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <DashboardLayout>
        <Modal>
          {/* <Navigation
            routes={this.state.allowedRoutes}
            path={this.props.match.path}
          /> */}
          <Switch>
            {this.state.allowedRoutes.map((route) => (
              <PrivateRoute
                // routes={this.state.allowedRoutes}
                // pathUrl={this.props.match.path}
                exact
                key={route.url}
                component={Routes[route.component]}
                path={`${this.props.match.path}${route.url}`}
              />
            ))}
            {/* <Route component={NotFound} /> */}
            <Route component={NotFound} />
          </Switch>
        </Modal>
      </DashboardLayout>
    );
  }
}

export default PrivateRoutes;
