import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { indexOf, isEmpty } from "lodash";
// import Joyride from "react-joyride";

import useComponentSize from "helpers/useComponentSize";
import { useDeviceType } from "helpers/useDeviceType";

// import UserContext from "contexts/user/user.provider";
import DrawerItems from "containers/DrawerItems/DrawerItems";
import { DrawerProvider } from "contexts/drawer/drawer.provider";

import Sidebar from "./Dashboard/Sidebar/Sidebar";
import Topbar from "./Dashboard/Topbar/Topbar";
import {
  LayoutWrapper,
  ContentWrapper,
  ContentInnerWrapper,
} from "./Dashboard/Layout.style";

const SidedbarDesktop = styled.div`
  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;
const imageURL =
  "https://fantasycongress.com/images/icon_pattern_big_light.png";

const DashboardLayout = (props) => {
  let [topbarRef, { height }] = useComponentSize();
  let [sidebarRef, { width }] = useComponentSize();
  // const { user } = React.useContext(UserContext);
  const { desktop, mobile, tablet } = useDeviceType();
  const location = useLocation();
  const pathLocation = location.pathname.replace(/\/+$/, "");
  const pathname =
    pathLocation[0] === "/" ? pathLocation.substr(1) : pathLocation;
  const builder = pathLocation.split("/").includes("builder");
  const getPath = (arr, a, b = 0, val = "") => {
    if (arr && !isEmpty(arr)) {
      if (a === 0) {
        return "/";
      }
      if (a === b || arr.length === a || arr.length === b) {
        return val;
      } else {
        return getPath(arr, a, b + 1, `${val}/${arr[b]}`);
      }
    } else {
      return "/";
    }
  };
  const pathValues = pathname.split("/").reduce((arr, p) => {
    const rootPathIndex = indexOf(pathname.split("/"), p);
    arr.push({
      name: (p.charAt(0).toUpperCase() + p.slice(1)).replace("-", " "),
      path: getPath(pathLocation.split("/"), rootPathIndex),
    });
    return arr;
  }, []);

  // const handleProductTourCallback = (data) => {
  //   const { type } = data;

  //   console.groupCollapsed(type);
  //   console.log(data);
  //   console.groupEnd();
  // };
  // const commonSteps = [
  //   {
  //     content: "Some brief stats for your overview",
  //     placement: "bottom",
  //     target:
  //       ".main__dashboard__content .product_tour__step_1 .product_tour__sub_step_1",
  //     textAlign: "center",
  //   },
  // ];

  // const seekerSteps = [
  //   ...commonSteps,
  //   {
  //     content: "The latest version of React!",
  //     placement: "bottom",
  //     target: ".app__scroller h2",
  //     textAlign: "center",
  //   },
  //   {
  //     content: "Nobody likes errors! 🤬",
  //     placement: "top",
  //     target: ".app__scroller h3:nth-of-type(2)",
  //   },
  //   {
  //     content: "Yay! Portals are awesome",
  //     placement: "top",
  //     target: ".app__scroller h3:nth-of-type(3)",
  //   },
  //   {
  //     content: "SSR is supported",
  //     placement: "top",
  //     target: ".app__scroller h3:nth-of-type(4)",
  //   },
  // ];
  // const employerSteps = [
  //   ...commonSteps,
  //   {
  //     content: "The latest version of React!",
  //     placement: "bottom",
  //     target: ".app__scroller h2",
  //     textAlign: "center",
  //   },
  //   {
  //     content: "Nobody likes errors! 🤬",
  //     placement: "top",
  //     target: ".app__scroller h3:nth-of-type(2)",
  //   },
  //   {
  //     content: "Yay! Portals are awesome",
  //     placement: "top",
  //     target: ".app__scroller h3:nth-of-type(3)",
  //   },
  //   {
  //     content: "SSR is supported",
  //     placement: "top",
  //     target: ".app__scroller h3:nth-of-type(4)",
  //   },
  // ];

  return (
    <>
      {/* <Joyride
        run={!user?.productTour}
        steps={
          user?.isEmployer
            ? employerSteps
            : user?.isSeeker
            ? seekerSteps
            : commonSteps
        }
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleProductTourCallback}
      /> */}
      <DrawerProvider>
        {builder ? (
          props.children
        ) : (
          <>
            <Topbar
              path={props.path}
              routes={props.routes}
              refs={topbarRef}
              deviceType={{ desktop, mobile, tablet }}
            />
            <LayoutWrapper
              style={{
                height: `calc(100vh - ${height}px)`,
              }}
            >
              {desktop ? (
                <>
                  <SidedbarDesktop>
                    <Sidebar
                      deviceType={{ desktop, mobile, tablet }}
                      path={props.path}
                      routes={props.routes}
                      refs={sidebarRef}
                      style={{
                        height: `calc(100vh - ${height}px)`,
                      }}
                    />
                  </SidedbarDesktop>
                  <ContentWrapper
                    style={{
                      width: `calc(100% - ${width}px)`,
                      backgroundImage: ` url(${imageURL})`,
                    }}
                  >
                    <ContentInnerWrapper>
                      <div
                        id="dashboard"
                        style={{
                          display: "inherit",
                          height: "100%",
                        }}
                      >
                        <div
                          className="main__dashboard__content"
                          style={
                            builder
                              ? {
                                  marginLeft: 0,
                                  padding: 0,
                                  display: "flex",
                                  flexDirection: "column",
                                  height: "100%",
                                }
                              : {
                                  display: "flex",
                                  flexDirection: "column",
                                  height: "100%",
                                }
                          }
                        >
                          <div style={{ flex: "1 0 auto" }}>
                            <div id="titlebar">
                              <div className="row">
                                <div className="col-md-12">
                                  {/* Breadcrumbs */}
                                  <nav id="breadcrumbs">
                                    <ul>
                                      <li>
                                        <Link to="/">Home</Link>
                                      </li>
                                      {pathValues.map((singlePath, i) => (
                                        <li key={i}>
                                          <Link
                                            to={{
                                              pathname: location.path,
                                              pageProps: {
                                                title: singlePath.name,
                                              },
                                            }}
                                          >
                                            {singlePath.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </nav>
                                </div>
                              </div>
                            </div>
                            {props.children}
                          </div>
                          <div className="row" style={{ marginTop: "auto" }}>
                            {/* Copyrights */}
                            <div className="col-md-12">
                              <div className="copyrights">
                                © Copyright {new Date().getFullYear()}{" "}
                                <Link to="/">TheDatabase</Link>. All Rights
                                Reserved.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ContentInnerWrapper>
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
                  <ContentInnerWrapper
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div style={{ flex: "1 0 auto" }}>{props.children}</div>
                    <div className="row" style={{ marginTop: "auto" }}>
                      {/* Copyrights */}
                      <div className="col-md-12">
                        <div className="copyrights">
                          © Copyright {new Date().getFullYear()}{" "}
                          <Link to="/">TheDatabase</Link>. All Rights Reserved.
                        </div>
                      </div>
                    </div>
                  </ContentInnerWrapper>
                </ContentWrapper>
              )}
            </LayoutWrapper>
            <DrawerItems />
          </>
        )}
      </DrawerProvider>
    </>
  );
};

export default DashboardLayout;
