import * as React from "react";

import NetworkStatus from "../NetworkStatus";

const Offline = ({ children }) => (
  <NetworkStatus>{online => (online ? null : children)}</NetworkStatus>
);

export default Offline;
