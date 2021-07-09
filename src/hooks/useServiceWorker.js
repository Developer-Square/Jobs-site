import React from "react";
import { register, unregister } from "register-service-worker";

export const useServiceWorker = ({ timeout = 1000 }) => {
  const [updateAvailable, setUpdateAvailable] = React.useState(false);
  const [registration, setRegistration] = React.useState(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (registration) {
        registration.update();
      }
    }, timeout);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registration]);

  const registered = registration => setRegistration(registration);
  const updated = () => setUpdateAvailable(true);

  React.useEffect(() => {
    if (window.Cypress || !process.env.SERVICE_WORKER_EXISTS) {
      unregister();
    } else {
      register("/service-worker.js", { registered, updated });
      return () => unregister();
    }
  }, []);

  return { updateAvailable };
};
