import { Helmet } from "react-helmet";
import { Slide, toast } from "react-toastify";
import React, { memo, useEffect } from "react";
import ModalRegistrar from "modals/ModalRegistrar";
import TheDBLogo from "image/thedb.png";

const Wrapper = ({ children }) => {
  useEffect(() => {
    toast.configure({
      role: "alert",
      hideProgressBar: true,
      transition: Slide,
      closeButton: false,
      position: "bottom-right",
      pauseOnFocusLoss: false,
    });
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>TheDatabase - Jobs Need People</title>
        <meta
          name="description"
          content="A free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3."
        />
        <link rel="canonical" href={`${window.location.origin}`} />
        <meta property="og:url" content={`${window.location.origin}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="A free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3."
        />
        <meta property="og:image" content={`${TheDBLogo}`} />
      </Helmet>

      {children}

      <ModalRegistrar />
    </>
  );
};

export default memo(Wrapper);
