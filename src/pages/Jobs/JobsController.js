import React from "react";
import { useAppState } from "contexts/app/app.provider";
import JobPost from "./JobPost";
import JobView from "./JobView";
import JobManage from "./JobManage";

export default function JobsController() {
  let RenderView;

  if (useAppState("currentForm") === "post") {
    console.log("Render view post", RenderView);
    RenderView = JobPost;
  }

  if (useAppState("currentForm") === "view") {
    console.log("Render view view", RenderView);
    RenderView = JobView;
  }
  if (useAppState("currentForm") === "manage") {
    console.log("Render view manage", RenderView);
    RenderView = JobManage;
  }

  return <RenderView />;
}
