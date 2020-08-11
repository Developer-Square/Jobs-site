/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useCallback } from "react";
import JobsController from "./JobsController";
import { useStickyDispatch } from "contexts/app/app.provider";

function Jobs() {
  const useDispatch = useStickyDispatch();
  const setAppState = useCallback(() => useDispatch({ type: "VIEW" }), [
    useDispatch,
  ]);
  useEffect(() => {
    setAppState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <JobsController />;
}
export default Jobs;
