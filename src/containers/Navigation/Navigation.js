import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { history } from "helpers/history";

class Navigation extends Component {
  handleLogout = () => {
    localStorage.removeItem("thedb_auth_roles");
    history.push("/");
  };

  render() {
    return (
      <div>
        <div>
          <ol>
            {this.props.routes.map((route) => (
              <Link
                key={route.url}
                className="nav-link"
                to={`${this.props.path}${route.url}`}
              >
                {route.title}
              </Link>
            ))}
          </ol>
        </div>

        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

Navigation.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  path: PropTypes.string.isRequired,
};

export default Navigation;
