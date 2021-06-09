import * as React from "react";

import { META_DEFAULTS } from "core/config";
import MetaConsumer from "./consumer";
import { Provider as MetaProvider } from "./context";

const removeEmpty = obj => {
  const newObj = {};
  Object.keys(obj).forEach(prop => {
    if (obj[prop] && obj[prop] !== "") {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

const MetaWrapper = ({ children, meta }) => (
  <MetaProvider value={{ ...META_DEFAULTS, ...removeEmpty(meta) }}>
    <MetaConsumer>{children}</MetaConsumer>
  </MetaProvider>
);

export default MetaWrapper;
