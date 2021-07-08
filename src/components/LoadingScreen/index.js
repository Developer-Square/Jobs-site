import { Fade, Modal } from "@material-ui/core";
import React, { memo } from "react";
import { getRandomTip } from "data/tips";
import Logo from "components/Logo/Logo";

const dataTestId = "loading-screen";

const LoadingScreen = () => (
  <Modal data-testid={dataTestId} open>
    <Fade in>
      <div className="w-screen h-screen flex justify-center items-center outline-none">
        <div className="flex flex-col items-center">
          <Logo size="48px" className="mb-4" />
          <span className="font-medium opacity-75">{getRandomTip()}</span>
        </div>
      </div>
    </Fade>
  </Modal>
);

export default memo(LoadingScreen);
export { dataTestId };
