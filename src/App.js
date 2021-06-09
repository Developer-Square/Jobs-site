import React from "react";
import { ThemeProvider as OriginalThemeProvider } from "styled-components";
import { useDarkMode } from "helpers/useDarkMode";
import { GlobalStyle } from "styles/global-styles";
import { lightTheme, darkTheme } from "styles/theme";
import { useDeviceType } from "helpers/useDeviceType";
import { AuthProvider } from "contexts/auth/auth.provider";
import { StickyProvider } from "contexts/app/app.provider";
import { SearchProvider } from "contexts/search/search.provider";
import { HeaderProvider } from "contexts/header/header.provider";
import BaseRouter from "routers/router";
import { useRouterQuery } from "helpers/useRouterQuery";

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
  const [theme, componentMounted] = useDarkMode();
  const userAgent = navigator.userAgent;
  const deviceType = useDeviceType(userAgent);
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  if (!componentMounted) {
    return <div />;
  }

  const query = queryParams.get("text") ? queryParams.get("text") : "";

  return (
    <CacheBuster>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          refreshCacheAndReload();
        }

        return (
          <OriginalThemeProvider theme={themeMode}>
            <SearchProvider query={query}>
              <HeaderProvider>
                <AuthProvider>
                  <StickyProvider>
                    <BaseRouter deviceType={deviceType} />
                  </StickyProvider>
                </AuthProvider>
              </HeaderProvider>
              <GlobalStyle />
            </SearchProvider>
          </OriginalThemeProvider>
        );
      }}
    </CacheBuster>
  );
}
