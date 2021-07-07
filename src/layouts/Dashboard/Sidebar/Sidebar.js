import React from "react";
import { withRouter, Link, useHistory, useLocation } from "react-router-dom";
import { groupBy } from "utils/groupBy";

export default withRouter(function Sidebar(props) {
  const menuItems = groupBy(props.routes, "category");
  const history = useHistory();
  const location = useLocation();
  console.log(location);

  const menuHandler = (section, parent = null) => {
    return section.map((menuItem) => {
      if (!menuItem.children || menuItem.children.length === 0) {
        return menuItem.dashboardItem ? (
          <li key={menuItem.title}>
            <Link
              onClick={() =>
                history.push(
                  `${props.path}${parent ? parent.url : ""}${menuItem.url}`,
                  { state: menuItem },
                )
              }
              to={`${props.path}${parent ? parent.url : ""}${menuItem.url}`}
              exact={menuItem.exact}
            >
              {menuItem.title}
            </Link>
          </li>
        ) : null;
      }
      return (
        <li key={menuItem.title}>
          <Link>{menuItem.title}</Link>
          <ul>{menuHandler(menuItem.children, menuItem)}</ul>
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
