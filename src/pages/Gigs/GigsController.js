/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useAppState } from "contexts/app/app.provider";
import GigPost from "./GigPost";
import GigView from "./GigView";
import GigManage from "./GigManage";

export default function GigsController() {
  let RenderView;
  const currentForm = useAppState("currentForm");

  if (currentForm === "post") {
    RenderView = GigPost;
  }
  if (currentForm === "view" || currentForm === "edit") {
    RenderView = GigView;
  }
  if (currentForm === "manage") {
    RenderView = GigManage;
  }

  return <RenderView />;
}
