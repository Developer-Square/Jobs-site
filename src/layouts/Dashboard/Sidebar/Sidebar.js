import React from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import { groupBy } from "utils/groupBy";

export default withRouter(function Sidebar(props) {
  const menuItems = groupBy(props.routes, "category");
  const history = useHistory();
  const menuHandler = (section) => {
    return section.map((menuItem) => {
      if (!menuItem.children || menuItem.children.length === 0) {
        return (
          <li key={menuItem.title}>
            <Link
              to={`${props.path}${menuItem.url}`}
              exact={menuItem.exact}
              onClick={() =>
                history.push(`${props.path}${menuItem.url}`, menuItem)
              }
            >
              {menuItem.title}
            </Link>
          </li>
        );
      }
      return (
        <li key={menuItem.title}>
          <Link>{menuItem.title}</Link>
          <ul>{menuHandler(menuItem.children)}</ul>
        </li>
      );
    });
  };
  return (
    <div className="dashboard-nav">
      <div className="dashboard-nav-inner">
        {Object.keys(menuItems).map((section, i) => (
          <ul key={i} data-submenu-title={section}>
            {menuHandler(menuItems[section])}
          </ul>
        ))}
      </div>
    </div>
  );
});
