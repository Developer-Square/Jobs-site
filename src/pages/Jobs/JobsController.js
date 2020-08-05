import React, { useContext } from "react";
import { AuthContext } from "contexts/auth/auth.context";
import JobPost from "./JobPost";
import JobView from "./JobView";

export default function JobsController() {
  const { authState } = useContext(AuthContext);
  let RenderView;

  if (authState.currentForm === "post") {
    console.log("Render view post", RenderView);
    RenderView = JobPost;
  }

  if (authState.currentForm === "view") {
    console.log("Render view view", RenderView);
    RenderView = JobView;
  }

  return <RenderView />;
}
