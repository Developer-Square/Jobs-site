/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useCallback } from "react";
import GigsController from "./GigsController";
import { useStickyDispatch } from "contexts/app/app.provider";

function Gigs() {
  const useDispatch = useStickyDispatch();
  const setAppState = useCallback(() => useDispatch({ type: "VIEW" }), [
    useDispatch,
  ]);
  useEffect(() => {
    setAppState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <GigsController />;
}
export default Gigs;
