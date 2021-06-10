import React from "react";

import { useServiceWorker } from "hooks";

import { ServiceWorkerContext } from ".";

export const ServiceWorkerProvider = ({ children, timeout }) => {
  const context = useServiceWorker({ timeout });
  return (
    <ServiceWorkerContext.Provider value={context}>
      {children}
    </ServiceWorkerContext.Provider>
  );
};
