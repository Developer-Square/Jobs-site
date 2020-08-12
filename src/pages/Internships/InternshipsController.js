import React from "react";
import { useAppState } from "contexts/app/app.provider";
import InternshipPost from "./InternshipPost";
import InternshipView from "./InternshipView";
import InternshipManage from "./InternshipManage";

export default function InternshipsController() {
  let RenderView;

  if (useAppState("currentForm") === "post") {
    RenderView = InternshipPost;
  }

  if (useAppState("currentForm") === "view") {
    RenderView = InternshipView;
  }
  if (useAppState("currentForm") === "manage") {
    RenderView = InternshipManage;
  }

  return <RenderView />;
}
