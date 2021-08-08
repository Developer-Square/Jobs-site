import React from "react";
import useComponentSize from "helpers/useComponentSize";
import Sidebar from "./Dashboard/Sidebar/Sidebar";
import Topbar from "./Dashboard/Topbar/Topbar";
import DrawerItems from "containers/DrawerItems/DrawerItems";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import {
  LayoutWrapper,
  ContentWrapper,
  ContentInnerWrapper,
} from "./Dashboard/Layout.style";
import { useDeviceType } from "helpers/useDeviceType";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { indexOf, isEmpty } from "lodash";

const SidedbarDesktop = styled.div`
  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;

const DashboardLayout = (props) => {
  let [topbarRef, { height }] = useComponentSize();
  let [sidebarRef, { width }] = useComponentSize();
  const { desktop } = useDeviceType();
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

  return (
    <DrawerProvider>
      {builder ? (
        props.children
      ) : (
        <>
          <Topbar path={props.path} routes={props.routes} refs={topbarRef} />
          <LayoutWrapper
            style={{
              height: `calc(100vh - ${height}px)`,
            }}
          >
            {desktop ? (
              <>
                <SidedbarDesktop>
                  <Sidebar
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
                  }}
                >
                  <ContentInnerWrapper>
                    <div id="dashboard" style={{ display: "inherit" }}>
                      <div style={builder ? { marginLeft: 0, padding: 0 } : {}}>
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
                        <div className="row">
                          {/* Copyrights */}
                          <div className="col-md-12">
                            <div className="copyrights">
                              © Copyright {new Date().getFullYear()}{" "}
                              <Link to="/">TheDatabase</Link>. All Rights
                              Reserved.
                            </div>
                          </div>
                        </div>{" "}
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
                <ContentInnerWrapper>
                  {props.children}
                  <div className="row">
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
  );
};

export default DashboardLayout;
