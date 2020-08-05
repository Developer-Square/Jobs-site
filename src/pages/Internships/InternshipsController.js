import React, { useContext } from "react";
import { AuthContext } from "contexts/auth/auth.context";
import InternshipPost from "./InternshipPost";
import InternshipView from "./InternshipView";

export default function InternshipsController() {
  const { authState } = useContext(AuthContext);
  let RenderView;

  if (authState.currentForm === "post") {
    console.log("Render view post", RenderView);
    RenderView = InternshipPost;
  }

  if (authState.currentForm === "view") {
    console.log("Render view view", RenderView);
    RenderView = InternshipView;
  }

  return <RenderView />;
}
