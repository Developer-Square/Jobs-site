import React, { useContext } from "react";
import { AuthContext } from "contexts/auth/auth.context";
import GigPost from "./GigPost";
import GigView from "./GigView";
import GigManage from "./GigManage";

export default function GigsController() {
  const { authState } = useContext(AuthContext);
  let RenderView;

  if (authState.currentForm === "post") {
    console.log("Render view post", RenderView);
    RenderView = GigPost;
  }

  if (authState.currentForm === "view") {
    console.log("Render view view", RenderView);
    RenderView = GigView;
  }
  if (authState.currentForm === "manage") {
    console.log("Render view manage", RenderView);
    RenderView = GigManage;
  }

  return <RenderView />;
}
