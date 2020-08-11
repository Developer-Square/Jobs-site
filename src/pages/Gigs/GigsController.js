import React from "react";
import { useAppState } from "contexts/app/app.provider";
import GigPost from "./GigPost";
import GigView from "./GigView";
import GigManage from "./GigManage";

export default function GigsController() {
  let RenderView;
  console.log("dfsfsfsfdsfs", useAppState("currentForm"));

  if (useAppState("currentForm") === "post") {
    console.log("Render view post", RenderView);
    RenderView = GigPost;
  }

  if (useAppState("currentForm") === "view") {
    console.log("Render view view", RenderView);
    RenderView = GigView;
  }
  if (useAppState("currentForm") === "manage") {
    console.log("Render view manage", RenderView);
    RenderView = GigManage;
  }

  return <RenderView />;
}
