import React from "react";
import { useDeviceType } from "helpers/useDeviceType";
import { AuthProvider } from "contexts/auth/auth.provider";
import { StickyProvider } from "contexts/app/app.provider";
import { SearchProvider } from "contexts/search/search.provider";
import { HeaderProvider } from "contexts/header/header.provider";
import { ServiceWorkerProvider } from "contexts/ServiceWorkerProvider";
import BaseRouter from "routers/router";
import { useRouterQuery } from "helpers/useRouterQuery";
import { serviceWorkerTimeout } from "constants/constants";
// External CSS import here
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-phone-input-2/lib/style.css";
import "rc-drawer/assets/index.css";
import "rc-table/assets/index.css";
import "rc-collapse/assets/index.css";
import "@redq/reuse-modal/lib/index.css";

import CacheBuster from "./CacheBuster";

export default function App() {
  const queryParams = useRouterQuery();
  const userAgent = navigator.userAgent;
  const deviceType = useDeviceType(userAgent);

  const query = queryParams.get("text") ? queryParams.get("text") : "";

  return (
    <CacheBuster>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          refreshCacheAndReload();
        }

        return (
          <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
            <SearchProvider query={query}>
              <HeaderProvider>
                <AuthProvider>
                  <StickyProvider>
                    <BaseRouter deviceType={deviceType} />
                  </StickyProvider>
                </AuthProvider>
              </HeaderProvider>
            </SearchProvider>
          </ServiceWorkerProvider>
        );
      }}
    </CacheBuster>
  );
}
