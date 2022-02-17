import React from "react";
import { SlidePopup } from "./Slide.style";
import { closeModal, openModal } from "@redq/reuse-modal";
import { useSidebar } from "contexts/sidebar/use-sidebar";
import { createGlobalStyle } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import useOnClickOutside from "utils/useOnClickOutside";

const SlidePopupStyle = createGlobalStyle`
  .slidePopup{
    top: auto !important;
    left: auto !important;
    bottom: 50px !important;
    right: 50px !important;
    box-shadow: ${themeGet("shadows.big", "0 21px 36px rgba(0, 0, 0, 0.16)")};
    transform-origin: bottom right;

    @media (max-width: 769px) {
      max-width: none!important;
      width: 100% !important;
      bottom: 0 !important;
      left: 0!important;
      background: ${themeGet("colors.white", "#ffffff")};
      overflow: initial !important;
      transform-origin: bottom center;
    }
  }

.fixedProductPopup{
  @media (min-width: 991px) {
    display: none;
  }
}
`;

const Slide = ({ children, ...rest }) => {
  const { isOpen, toggleSidebar } = useSidebar();

  const { mobile } = rest.deviceType;

  const ref = React.useRef();

  const handleModal = (props) => {
    openModal({
      show: true,
      config: {
        className: "slidePopup",
        width: "auto",
        height: "auto",
        enableResizing: false,
        disableDragging: true,
        transition: {
          tension: 360,
          friction: 40,
        },
      },
      closeOnClickOutside: true,
      component: () => <div>{children}</div>,
      closeComponent: () => <div />,
      componentProps: {
        onCloseBtnClick: closeModal,
        scrollbarHeight: 330,
      },
    });
  };

  let sliderClass = isOpen === true ? "slidePopupFixed" : "";

  useOnClickOutside(ref, () => toggleSidebar());

  return (
    <div ref={isOpen ? ref : null}>
      <SlidePopupStyle />
      {mobile && isOpen ? (
        handleModal(children)
      ) : (
        <SlidePopup className={sliderClass}>{children}</SlidePopup>
      )}
    </div>
  );
};

export default Slide;
