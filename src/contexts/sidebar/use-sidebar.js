import React, { useReducer, useContext, createContext } from "react";
import { reducer } from "./sidebar.reducer";

const SidebarContext = createContext({});
const INITIAL_STATE = {
  isOpen: false,
};

const useSidebarActions = (initialSidebar = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialSidebar);

  const clearSidebarHandler = () => {
    dispatch({ type: "CLEAR_SIDEBAR" });
  };
  const toggleSidebarHandler = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  return {
    state,
    clearSidebarHandler,
    toggleSidebarHandler,
  };
};

export const SidebarProvider = ({ children }) => {
  const {
    state,
    clearSidebarHandler,
    toggleSidebarHandler,
  } = useSidebarActions();

  return (
    <SidebarContext.Provider
      value={{
        isOpen: state.isOpen,
        clearSidebar: clearSidebarHandler,
        toggleSidebar: toggleSidebarHandler,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
