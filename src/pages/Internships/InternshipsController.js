/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useAppState } from "contexts/app/app.provider";
import InternshipPost from "./InternshipPost";
import InternshipView from "./InternshipView";
import InternshipManage from "./InternshipManage";

export default function InternshipsController() {
  let RenderView;
  const currentForm = useAppState("currentForm");

  if (currentForm === "post") {
    RenderView = InternshipPost;
  }
  if (currentForm === "view" || currentForm === "edit") {
    RenderView = InternshipView;
  }
  if (currentForm === "manage") {
    RenderView = InternshipManage;
  }

  return <RenderView />;
}
