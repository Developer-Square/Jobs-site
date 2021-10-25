import React from "react";
import { Spinner, Bounce1, Bounce2 } from "./Loader.style";

function Loader() {
  return (
    <div className="h-52 flex space-x-2 p-5 rounded-full justify-center items-center">
      <Spinner>
        <Bounce1 />
        <Bounce2 />
      </Spinner>
    </div>
  );
}
export default Loader;
