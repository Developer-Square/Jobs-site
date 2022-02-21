import React from "react";
import Banner from "containers/Banner/Banner";
import CategoriesSection from "./CategoriesSection";
import Vacancies from "./VacanciesSection";
import InfoSection from "./InfoSection";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "contexts/auth/auth.context";
import UserContext from "contexts/user/user.provider";
import seekerImg from "image/9.jpg";
import employerImg from "image/3.jpg";
// import Users from "./UsersSection";
import { Carousel } from "react-responsive-carousel";

function LandingPage({ deviceType }) {
  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);
  const { userType } = React.useContext(UserContext);
  const history = useHistory();

  const handleRedirect = () => {
    if (isAuthenticated) {
      history.push(`/dashboard`);
    } else {
      history.push(`/auth/`);
    }
  };
  return (
    <React.Fragment>
      {userType === "Employer" && (
        <div>
          <Banner
            bannerHeading={"HIRE THE RIGHT PEOPLE"}
            bannerSubHeading={
              "People are not your most important asset, The right people are!"
            }
            bannerImage={employerImg}
          />
          <div className="section-background top-0 margin-bottom-0">
            <div className="container-x relative">
              <div className="container relative max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0">
                {/*Main Col*/}
                <div className="container mx-auto my-1">
                  <h3 className="font-bold text-2xl transition duration-500 my-2">
                    What You Get
                  </h3>
                  <hr className="my-1 rounded border-b-2 border-blue-800 w-8" />
                </div>
                <div className="container relative mx-auto my-1 z-10">
                  <div className="relative rounded-lg flex flex-col md:flex-row items-center mx-2">
                    <div className="shadow-xl z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
                      <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                        <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">
                          Larger Workforce
                        </h3>
                      </div>
                      <svg
                        className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon points="50,0 100,0 50,100 0,100" />
                      </svg>
                    </div>
                    <div className="shadow-xl z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
                      <div className="p-4 md:pr-14 md:pl-8 md:py-6 mx-2 md:mx-0 h-full bg-white rounded-lg shadow-xl md:shadow-none">
                        <h3 className="hidden md:block font-bold text-2xl text-gray-700">
                          Larger Workforce
                        </h3>
                        <p className="text-gray-600 text-justify">
                          Interns are valuable support and help to current
                          employees, even if tasks given to them have modest
                          levels of responsibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container relative mx-auto my-1 z-10">
                  <div className="relative rounded-lg flex flex-col md:flex-row items-center mx-2">
                    <div className="shadow-xl z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
                      <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                        <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">
                          New Perspective
                        </h3>
                      </div>
                      <svg
                        className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon points="50,0 100,0 50,100 0,100" />
                      </svg>
                    </div>
                    <div className="shadow-xl z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
                      <div className="p-4 md:pr-14 md:pl-8 md:py-6 mx-2 md:mx-0 h-full bg-white rounded-lg shadow-xl md:shadow-none">
                        <h3 className="hidden md:block font-bold text-2xl text-gray-700">
                          New Perspective
                        </h3>
                        <p className="text-gray-600 text-justify">
                          Interns offer a fresh look at a company's day-to-day
                          business and procedures and can share ideas on
                          strategy, plans, policies and more.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container relative mx-auto my-1 z-10">
                  <div className="relative rounded-lg flex flex-col md:flex-row items-center mx-2">
                    <div className="shadow-xl z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
                      <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                        <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">
                          Mentorship Opportunities
                        </h3>
                      </div>
                      <svg
                        className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon points="50,0 100,0 50,100 0,100" />
                      </svg>
                    </div>
                    <div className="shadow-xl z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
                      <div className="p-4 md:pr-14 md:pl-8 md:py-6 mx-2 md:mx-0 h-full bg-white rounded-lg shadow-xl md:shadow-none">
                        <h3 className="hidden md:block font-bold text-2xl text-gray-700">
                          Mentorship Opportunities
                        </h3>
                        <p className="text-gray-600 text-justify">
                          Internship programs give current employees an
                          opportunity to mentor future leaders in the field, and
                          it can promote a healthy work culture and build
                          company morale.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Img Col*/}
                <div className="absolute flex w-2/5 lg:w-2/5 h-90 right-8">
                  {/* Big profile image for side bar (desktop) */}
                  <img
                    alt="landing"
                    src="https://source.unsplash.com/MP0IUfwrn0A"
                    className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
                  />
                  {/* Image from: http://unsplash.com/photos/MP0IUfwrn0A */}
                </div>
              </div>
            </div>
          </div>

          {/* <Users /> */}
          {/* <InfoSection /> */}
          <div className="infobox margin-bottom-0">
            <div className="container-x">
              <div className="sixteen columns">
                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3 className="font-bold text-center text-2xl text-white transition duration-500 my-2">
                    Our Mission
                  </h3>
                  <hr className="rounded border-b-2 border-white w-8 mx-auto" />
                  <p className="text-base text-body-color leading-relaxed mb-7">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <Loader /> */}
          {/* <CounterSection /> */}
          <div className="section-background top-0 margin-bottom-0">
            <div className="container-x">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-full xl:w-1/4 px-4">
                  <h3 className="font-bold text-2xl transition duration-500 my-2">
                    Our Success
                  </h3>
                  <h3 className="font-bold text-2xl transition duration-500 my-2">
                    Story
                  </h3>
                  <hr className="my-1 rounded border-b-2 border-blue-800 w-8" />
                </div>
                <div className="w-full md:w-full xl:w-3/4 px-4">
                  <Carousel
                    showarrows={false}
                    autoPlay
                    // onchange={onChange}
                    // onclickitem={onClickItem}
                    // onclickthumb={onClickThumb}

                    showThumbs={true}
                    showStatus={false}
                    infiniteLoop
                    // emulateTouch
                    useKeyboardArrows
                    transitionTime={1000}
                    // axis="vertical"
                    // selectedItem={1}
                  >
                    <div
                      className="mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800"
                      style={{ maxWidth: 500 }}
                    >
                      <div className="w-full mb-10">
                        <div className="font-nunito text-5xl font-bold text-indigo-500 text-left leading-tight h-3">
                          “
                        </div>
                        <p className="text-sm text-gray-600 text-center px-5">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Nam obcaecati laudantium recusandae, debitis eum
                          voluptatem ad, illo voluptatibus temporibus odio
                          provident.
                        </p>
                        <div className="font-nunito text-5xl font-bold text-indigo-500 text-right leading-tight h-3 -mt-3">
                          ”
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="w-10 h-10 bg-blue-600 flex rounded-full">
                          <img
                            alt="p"
                            className="h-10 w-10 rounded-full mx-auto"
                            src="https://randomuser.me/api/portraits/men/15.jpg"
                          />
                        </div>
                        <div className="w-full flex text-left">
                          <div className="w-full flex flex-col leading-none pl-4">
                            <p className="text-md text-indigo-500 font-bold">
                              Scott Windon
                            </p>
                            <p className="text-xs text-gray-500">
                              @scott.windon
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800"
                      style={{ maxWidth: 500 }}
                    >
                      <div className="w-full mb-10">
                        <div className="font-nunito text-5xl font-bold text-indigo-500 text-left leading-tight h-3">
                          “
                        </div>
                        <p className="text-sm text-gray-600 text-center px-5">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Nam obcaecati laudantium recusandae, debitis eum
                          voluptatem ad, illo voluptatibus temporibus odio
                          provident.
                        </p>
                        <div className="font-nunito text-5xl font-bold text-indigo-500 text-right leading-tight h-3 -mt-3">
                          ”
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="w-10 h-10 bg-blue-600 flex rounded-full">
                          <img
                            alt="p"
                            className="h-10 w-10 rounded-full mx-auto"
                            src="https://randomuser.me/api/portraits/men/15.jpg"
                          />
                        </div>
                        <div className="w-full flex text-left">
                          <div className="w-full flex flex-col leading-none pl-4">
                            <p className="text-md text-indigo-500 font-bold">
                              Scott Windon
                            </p>
                            <p className="text-xs text-gray-500">
                              @scott.windon
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800"
                      style={{ maxWidth: 500 }}
                    >
                      <div className="w-full mb-10">
                        <div className="font-nunito text-5xl font-bold text-indigo-500 text-left leading-tight h-3">
                          “
                        </div>
                        <p className="text-sm text-gray-600 text-center px-5">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Nam obcaecati laudantium recusandae, debitis eum
                          voluptatem ad, illo voluptatibus temporibus odio
                          provident.
                        </p>
                        <div className="font-nunito text-5xl font-bold text-indigo-500 text-right leading-tight h-3 -mt-3">
                          ”
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="w-10 h-10 bg-blue-600 flex rounded-full">
                          <img
                            alt="p"
                            className="h-10 w-10 rounded-full mx-auto"
                            src="https://randomuser.me/api/portraits/men/15.jpg"
                          />
                        </div>
                        <div className="w-full flex text-left">
                          <div className="w-full flex flex-col leading-none pl-4">
                            <p className="text-md text-indigo-500 font-bold">
                              Scott Windon
                            </p>
                            <p className="text-xs text-gray-500">
                              @scott.windon
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {userType === "Seeker" && (
        <div>
          <Banner
            bannerHeading={"Great Careers Start Here"}
            bannerSubHeading={"We've over 15,000 internship offers for you!"}
            bannerImage={seekerImg}
          />
          <Vacancies />
          <InfoSection />
          <div className="infobox margin-bottom-0">
            <div className="container-x">
              <div className="sixteen columns">
                Start Building Your Own Job Board Now{" "}
                <Link to={{ pathname: "" }} onClick={handleRedirect}>
                  {" "}
                  Get Started{" "}
                </Link>
              </div>
            </div>
          </div>
          {/* <Loader /> */}

          {/* <CounterSection /> */}
          <CategoriesSection />
        </div>
      )}
    </React.Fragment>
  );
}
export default LandingPage;
