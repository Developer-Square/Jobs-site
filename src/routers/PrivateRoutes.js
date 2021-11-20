import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { uniqBy } from "lodash";
import { rolesConfig } from "constants/roles.constants";
import * as Routes from "./PrivateRoutes.config";
// import Navigation from "containers/Navigation/Navigation";
import PrivateRoute from "./PrivateRoute";
import { Modal } from "@redq/reuse-modal";
import DashboardLayout from "layouts/DashboardLayout";
import NotFound from "pages/NotFound";

class PrivateRoutes extends Component {
  state = { allowedRoutes: [] };

  componentDidMount() {
    /*
      TODO: Replace hardcoded roles with API,
      contextAPI, localStorage, or get from server.
     */
    let roles = JSON.parse(localStorage.getItem("thedb_auth_roles"));
    if (roles) {
      roles = [...roles, "common"];
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
    const handler = (children, parent = null) => {
      return children.map((child, i) => {
        if (!child.children || child.children.length === 0) {
          // console.log(
          //   child.component,
          //   `${this.props.match.path}${parent ? parent.url : ""}${child.url}`,
          // );
          // console.log(this.props);
          // console.log(parent);
          // console.log(Routes[child.component]);
          return (
            <PrivateRoute
              exact
              key={`${child.title}-${child.url}(${i})`}
              component={Routes[child.component]}
              path={`${this.props.match.path}${parent ? parent.url : ""}${
                child.url
              }`}
              {...this.props}
            />
          );
        }
        return (
          <Switch key={`${child.url}${i}`}>
            {handler(child.children, child)}
          </Switch>
        );
      });
    };
    return (
      <DashboardLayout
        routes={this.state.allowedRoutes.filter(
          (filteredRoute) => filteredRoute.dashboardItem,
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
