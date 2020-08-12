import React from "react";
import { useAppState } from "contexts/app/app.provider";
import GigPost from "./GigPost";
import GigView from "./GigView";
import GigManage from "./GigManage";

export default function GigsController() {
  let RenderView;

  if (useAppState("currentForm") === "post") {
    RenderView = GigPost;
  }

  if (useAppState("currentForm") === "view") {
    RenderView = GigView;
  }
  if (useAppState("currentForm") === "manage") {
    RenderView = GigManage;
  }

  return <RenderView />;
}
