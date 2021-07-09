import React, { useContext, createContext } from "react";

export function CreateContext(defaultValue, reducer) {
  const t = true;
  const defaultDispatch = () => defaultValue;
  const stateCtx = createContext(defaultValue);
  const dispatchCtx = createContext(defaultDispatch);

  function useStateCtx(property) {
    const state = useContext(stateCtx);
    return state[property]; // only one depth selector for comparison
  }

  function useDispatchCtx() {
    return useContext(dispatchCtx);
  }

  function Provider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, defaultValue);
    return (
      <dispatchCtx.Provider value={dispatch}>
        <stateCtx.Provider value={state}>{children}</stateCtx.Provider>
      </dispatchCtx.Provider>
    );
  }
  if (t) {
    return [useStateCtx, useDispatchCtx, Provider];
  }

  return <React.Fragment />;
}
