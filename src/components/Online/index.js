import * as React from "react";

import NetworkStatus from "../NetworkStatus";

const Online = ({ children }) => (
  <NetworkStatus>{online => (online ? children : null)}</NetworkStatus>
);

export default Online;
