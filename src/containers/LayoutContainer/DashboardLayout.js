import React from "react";
import useComponentSize from "helpers/useComponentSize";
import Sidebar from "./Dashboard/Sidebar/Sidebar";
import Topbar from "./Dashboard/Topbar/Topbar";
import DrawerItems from "containers/DrawerItems/DrawerItems";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
// import { DrawerContext } from "contexts/drawer/drawer.context";
import {
  LayoutWrapper,
  ContentWrapper,
  ContentInnerWrapper,
} from "./Dashboard/Layout.style";
import { useDeviceType } from "helpers/useDeviceType";
import styled from "styled-components";

const SidedbarDesktop = styled.div`
  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;

const DashboardLayout = ({ children }) => {
  let [topbarRef, { height }] = useComponentSize();
  let [sidebarRef, { width }] = useComponentSize();
  const { desktop } = useDeviceType();
  // const { useDrawerDispatch } = useContext(DrawerContext);
  // // Toggle drawer
  // const toggleHandler = React.useCallback(() => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useDrawerDispatch({
  //     type: "TOGGLE",
  //   });
  // }, [useDrawerDispatch]);

  return (
    <DrawerProvider>
      <Topbar refs={topbarRef} />
      <LayoutWrapper
        style={{
          height: `calc(100vh - ${height}px)`,
        }}
      >
        {desktop ? (
          <>
            <SidedbarDesktop>
              <Sidebar
                refs={sidebarRef}
                style={{
                  height: `calc(100vh - ${height}px)`,
                }}
                // onMenuItemClick={toggleHandler}
              />
            </SidedbarDesktop>
            <ContentWrapper
              style={{
                width: `calc(100% - ${width}px)`,
              }}
            >
              <ContentInnerWrapper>{children}</ContentInnerWrapper>
            </ContentWrapper>
          </>
        ) : (
          <ContentWrapper
            style={{
              width: "100%",
            }}
          >
            <h3>
              width: {width} , height: {height}
            </h3>
            <ContentInnerWrapper>{children}</ContentInnerWrapper>
          </ContentWrapper>
        )}
      </LayoutWrapper>
      <DrawerItems />
    </DrawerProvider>
  );
};

export default DashboardLayout;
