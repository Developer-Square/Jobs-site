import "./i18n";

import React from "react";
import { ThemeProvider as OriginalThemeProvider } from "styled-components";
import { useDarkMode } from "helpers/useDarkMode";
import { GlobalStyle } from "styles/global-styles";
import { lightTheme, darkTheme } from "styles/theme";
import { Provider as AlertProvider } from "react-alert";
import { useHistory, useLocation } from "react-router-dom";
import { ReactHooksWrapper, setHook } from "hooks";
import { NotificationTemplate } from "components/NotificationTemplate";
import { useDeviceType } from "helpers/useDeviceType";
import { AuthProvider } from "contexts/auth/auth.provider";
import { StickyProvider } from "contexts/app/app.provider";
import { SearchProvider } from "contexts/search/search.provider";
import { HeaderProvider } from "contexts/header/header.provider";
import { ServiceWorkerProvider } from "contexts/ServiceWorkerProvider";
import { DatabaseProvider } from "contexts/database/database.provider";
import { ModalProvider } from "contexts/modal/modal.provider";
import { ResumeProvider } from "contexts/resume/resume.provider";
import { SettingsProvider } from "contexts/settings/settings.provider";
import { StorageProvider } from "contexts/storage/storage.provider";
import { UserProvider } from "contexts/user/user.provider";
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
import { withApollo } from "helpers/apollo";
import { MuiThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

const MUItheme = createTheme({
  typography: {
    fontWeightRegular: 500,
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

function App() {
  const queryParams = useRouterQuery();
  const [theme, componentMounted] = useDarkMode();
  const userAgent = navigator.userAgent;
  const deviceType = useDeviceType(userAgent);
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  if (!componentMounted) {
    return <div />;
  }
  setHook("historyHook", useHistory).setHook("locationHook", useLocation);

  const query = queryParams.get("text") ? queryParams.get("text") : "";
  const notificationConfig = {
    timeout: 5000,
    position: "top right",
    containerStyle: {
      top: 0,
    },
  };

  return (
    <SettingsProvider>
      <OriginalThemeProvider theme={themeMode}>
        <MuiThemeProvider theme={MUItheme}>
          <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
            <ModalProvider>
              <SearchProvider query={query}>
                <HeaderProvider>
                  <AuthProvider>
                    <UserProvider>
                      <DatabaseProvider>
                        <ResumeProvider>
                          <StickyProvider>
                            <AlertProvider
                              template={NotificationTemplate}
                              {...notificationConfig}
                            >
                              <StorageProvider>
                                <BaseRouter deviceType={deviceType} />
                              </StorageProvider>
                            </AlertProvider>
                          </StickyProvider>
                        </ResumeProvider>
                      </DatabaseProvider>
                    </UserProvider>
                  </AuthProvider>
                </HeaderProvider>
                <GlobalStyle />
              </SearchProvider>
            </ModalProvider>
            <ReactHooksWrapper />
          </ServiceWorkerProvider>
        </MuiThemeProvider>
      </OriginalThemeProvider>
    </SettingsProvider>
  );
}
export default withApollo(App);
