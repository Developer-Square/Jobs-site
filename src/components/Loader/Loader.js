import React from "react";
import {
  LoaderContainer,
  LoaderWrapper,
  Spinner,
  Bounce1,
  Bounce2,
} from "./Loader.style";

function Loader() {
  return (
    <LoaderContainer>
      <LoaderWrapper>
        <Spinner>
          <Bounce1 />
          <Bounce2 />
        </Spinner>
      </LoaderWrapper>
    </LoaderContainer>
  );
}
export default Loader;
