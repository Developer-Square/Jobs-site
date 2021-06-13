import React from "react";
import { ThemeProvider as OriginalThemeProvider } from "styled-components";
import { useDarkMode } from "helpers/useDarkMode";
import { GlobalStyle } from "styles/global-styles";
import { lightTheme, darkTheme } from "styles/theme";
import { Provider as AlertProvider } from "react-alert";
import { NotificationTemplate } from "components/NotificationTemplate";
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
  const notificationConfig = {
    timeout: 5000,
    position: "top right",
    containerStyle: {
      top: 0,
    },
  };

  return (
    <OriginalThemeProvider theme={themeMode}>
      <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
        <SearchProvider query={query}>
          <HeaderProvider>
            <AuthProvider>
              <StickyProvider>
                <AlertProvider
                  template={NotificationTemplate}
                  {...notificationConfig}
                >
                  <BaseRouter deviceType={deviceType} />
                </AlertProvider>
              </StickyProvider>
            </AuthProvider>
          </HeaderProvider>
          <GlobalStyle />
        </SearchProvider>
      </ServiceWorkerProvider>
    </OriginalThemeProvider>
  );
}
