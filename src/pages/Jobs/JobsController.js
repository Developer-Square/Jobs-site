/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useAppState } from "contexts/app/app.provider";
import JobPost from "./JobPost";
import JobView from "./JobView";
import JobManage from "./JobManage";

export default function JobsController() {
  let RenderView;
  const currentForm = useAppState("currentForm");

  if (currentForm === "post") {
    RenderView = JobPost;
  }
  if (currentForm === "view" || currentForm === "edit") {
    RenderView = JobView;
  }
  if (currentForm === "manage") {
    RenderView = JobManage;
  }

  return <RenderView />;
}
