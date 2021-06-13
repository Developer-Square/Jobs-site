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
    let authRoles = localStorage.getItem("thedb_auth_roles");
    let roles = JSON.parse(authRoles);

    if (roles) {
      roles = ["common", ...roles];
      let allowedRoutes = roles.reduce((acc, role) => {
        return [...acc, ...rolesConfig[role].routes];
      }, []);
      // For removing duplicate entries, compare with 'url'.
      allowedRoutes = uniqBy(allowedRoutes, "url");
      this.setState({ allowedRoutes });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    const handler = (children) => {
      return children.map((child, i) => {
        if (!child.children) {
          return (
            <PrivateRoute
              exact
              key={`${child.url}${i}`}
              component={Routes[child.component]}
              path={`${this.props.match.path}${child.url}`}
              {...this.props}
            />
          );
        }
        return <Switch>{handler(child.children)}</Switch>;
      });
    };
    return (
      <DashboardLayout
        routes={this.state.allowedRoutes.filter(
          (filteredRoute) => filteredRoute.dashboard_item
        )}
        path={this.props.match.path}
      >
        <Modal>
          <Switch>
            {handler(this.state.allowedRoutes)}

            <Route component={NotFound} />
          </Switch>
        </Modal>
      </DashboardLayout>
    );
  }
}

export default PrivateRoutes;
