import React from "react";
import { useAppState } from "contexts/app/app.provider";
import InternshipPost from "./InternshipPost";
import InternshipView from "./InternshipView";

export default function InternshipsController() {
  let RenderView;

  if (useAppState("currentForm") === "post") {
    console.log("Render view post", RenderView);
    RenderView = InternshipPost;
  }

  if (useAppState("currentForm") === "view") {
    console.log("Render view view", RenderView);
    RenderView = InternshipView;
  }

  return <RenderView />;
}
