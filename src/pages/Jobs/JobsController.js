import React from "react";
import { useAppState } from "contexts/app/app.provider";
import JobPost from "./JobPost";
import JobView from "./JobView";
import JobManage from "./JobManage";

export default function JobsController() {
  let RenderView;

  if (useAppState("currentForm") === "post") {
    RenderView = JobPost;
  }

  if (useAppState("currentForm") === "view") {
    RenderView = JobView;
  }
  if (useAppState("currentForm") === "manage") {
    RenderView = JobManage;
  }

  return <RenderView />;
}
