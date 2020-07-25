import React from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider as OriginalThemeProvider } from "styled-components";
import { useDarkMode } from "helpers/useDarkMode";
import { GlobalStyle } from "styles/global-styles";
import { lightTheme, darkTheme } from "styles/theme";
import { SearchProvider } from "contexts/search/search.provider";

import "@redq/reuse-modal/lib/index.css";

export default function App() {
  const location = useLocation();
  const [theme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  if (!componentMounted) {
    return <div />;
  }

  const query = location.search;

  return (
    <OriginalThemeProvider theme={themeMode}>
      <SearchProvider query={query}>
        <h1>Hello, Welcome to the Database</h1>
        <GlobalStyle />
      </SearchProvider>
    </OriginalThemeProvider>
  );
}
