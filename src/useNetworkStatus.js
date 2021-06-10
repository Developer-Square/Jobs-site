/* eslint-disable no-restricted-globals */
import React from "react";

export const useNetworkStatus = callBack => {
  const [online, setOnline] = React.useState(
    "onLine" in navigator ? navigator.onLine : true
  );

  const updateOnlineStatus = () => {
    const status = navigator.onLine;

    if (callBack) {
      callBack(status);
    }
    setOnline(navigator.onLine);
  };

  React.useEffect(() => {
    addEventListener("offline", updateOnlineStatus);
    addEventListener("online", updateOnlineStatus);

    return () => {
      removeEventListener("offline", updateOnlineStatus);
      removeEventListener("online", updateOnlineStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { online };
};
