import React from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import moment from "moment";

import UserContext from "contexts/user/user.provider";
import ModalContext from "contexts/modal/modal.provider";
import UserImage from "image/user.jpg";

function SeekerProfileForm({ details }) {
  const history = useHistory();
  const { emitter, events } = React.useContext(ModalContext);
  const { user } = React.useContext(UserContext);
  const location = useLocation();
  const isOwnAccount = () => {
    if (details?.id === user?.id) {
      return true;
    }
    return false;
  };
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;

  const isDashboardPage = pathname === "dashboard";

  const handleClick = () => emitter.emit(events.DELETE_MODAL);
  return (
    <div className="row" style={{ marginTop: isDashboardPage ? 0 : "80px" }}>
      <div className="col-lg-12 col-md-12">
        <div>
          <div className="w-full text-white bg-main-color">
            {/* End of Navbar */}
            <div className="container mx-auto p-5" style={{ width: "100%" }}>
              <div className="md:flex no-wrap md:-mx-2 ">
                {/* Left Side */}
                <div className="w-full md:w-3/12 md:mx-2">
                  {/* Profile Card */}
                  <div className="bg-white p-3 border-t-4 border-green-400">
                    <div className="image overflow-hidden">
                      <img
                        className="h-auto w-full mx-auto"
                        src={details?.avatar?.url || UserImage}
                        alt={details?.avatar?.alt || "profile"}
                      />
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                      {details?.fullName}
                    </h1>
                    <h3 className="text-gray-600 font-lg text-semibold leading-6">
                      {details?.seeker?.title}
                    </h3>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                      {details?.seeker?.descriptionPlaintext}
                    </p>
                    <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li className="flex items-center py-3">
                        <span>Status</span>
                        <span className="ml-auto">
                          <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                            {details?.seeker?.status}
                          </span>
                        </span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>Member since</span>
                        <span className="ml-auto">
                          {moment(details?.dateJoined).format("MMM D, YYYY")}
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* End of profile card */}
                  <div className="my-4" />
                  {/* Friends card */}
                  {details?.isEmployer && (
                    <div className="bg-white p-3 hover:shadow">
                      <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                        <span className="text-green-500">
                          <svg
                            className="h-5 fill-current"
                            xmlns="https://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </span>
                        <span>Similar Profiles</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <div className="text-center my-2">
                          <img
                            className="h-16 w-16 rounded-full mx-auto"
                            src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                            alt="profile"
                          />
                          <a href="/" className="text-main-color">
                            Kojstantin
                          </a>
                        </div>
                        <div className="text-center my-2">
                          <img
                            className="h-16 w-16 rounded-full mx-auto"
                            src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                            alt="profile"
                          />
                          <a href="/" className="text-main-color">
                            James
                          </a>
                        </div>
                        <div className="text-center my-2">
                          <img
                            className="h-16 w-16 rounded-full mx-auto"
                            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                            alt="profile"
                          />
                          <a href="/" className="text-main-color">
                            Natie
                          </a>
                        </div>
                        <div className="text-center my-2">
                          <img
                            className="h-16 w-16 rounded-full mx-auto"
                            src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                            alt="profile"
                          />
                          <a href="/" className="text-main-color">
                            Casey
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* End of friends card */}
                </div>
                {/* Right Side */}
                <div className="w-full md:w-9/12 md:mx-2">
                  {/* Profile tab */}
                  {/* About Section */}
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="https://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700">
                      <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-4">
                          <div className="px-4 py-2 font-semibold">Country</div>
                          <div className="col-span-3 px-4 py-2">
                            {details?.defaultAddress?.country?.country}
                          </div>
                        </div>
                        <div className="grid grid-cols-4">
                          <div className="px-4 py-2 font-semibold">City</div>
                          <div className="col-span-3 px-4 py-2">
                            {details?.defaultAddress?.city}
                          </div>
                        </div>
                        <div className="grid grid-cols-4">
                          <div className="px-4 py-2 font-semibold">Gender</div>
                          <div className="col-span-3 px-4 py-2">
                            {details?.seeker?.gender}
                          </div>
                        </div>
                        <div className="grid grid-cols-4">
                          <div className="px-4 py-2 font-semibold">Contact</div>
                          <div className="col-span-3 px-4 py-2">
                            {details?.phone}
                          </div>
                        </div>
                        <div className="grid grid-cols-4">
                          <div className="px-4 py-2 font-semibold">Addr.1</div>
                          <div className="col-span-3 px-4 py-2">
                            {details?.defaultAddress?.streetAddress1}
                          </div>
                        </div>
                        <div className="grid grid-cols-4">
                          <div className="px-4 py-2 font-semibold">Addr. 2</div>
                          <div className="col-span-3 px-4 py-2">
                            {details?.defaultAddress?.streetAddress2}
                          </div>
                        </div>
                        <div className="grid grid-cols-4">
                          <div className="px-4 py-2 font-semibold">Email.</div>
                          <div className="col-span-3 px-4 py-2">
                            <a
                              className="text-blue-800"
                              href={`mailto:${details?.email}`}
                            >
                              {details?.email}
                            </a>
                          </div>
                        </div>
                        <div className="grid grid-cols-4">
                          <div className="px-4 py-2 font-semibold">
                            Birthday
                          </div>
                          <div className="col-span-3 px-4 py-2">
                            {moment(details?.seeker?.dateOfBirth).format(
                              `MMM D, YYYY`,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                      Show Full Information
                    </button>
                  </div>
                  <div className="my-4" />

                  <div className="my-4" />
                  {details?.socials?.length > 0 ||
                  details?.resumes?.length > 0 ? (
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                      <div className="grid grid-cols-2">
                        <div>
                          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                            <span clas="text-green-500">
                              <svg
                                className="h-5"
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </span>
                            <span className="tracking-wide">Socials</span>
                          </div>
                          <ul className="list-inside space-y-2">
                            {details?.socials?.map((social, ii) => {
                              return (
                                <li key={ii}>
                                  <p className="text-blue-800">
                                    {social?.network}
                                  </p>
                                  <div className="text-gray-500 text-xs">
                                    {social?.username}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        {isOwnAccount() && (
                          <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                              <span clas="text-green-500">
                                <svg
                                  className="h-5"
                                  xmlns="https://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    fill="#fff"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                  />
                                  <path
                                    fill="#fff"
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                  />
                                </svg>
                              </span>
                              <span className="tracking-wide">Resumes</span>
                            </div>
                            <ul className="list-inside space-y-2">
                              {details?.resumes?.map((resume, jj) => {
                                return isOwnAccount() ? (
                                  <li key={jj}>
                                    <Link
                                      onClick={() =>
                                        history.push(`/r/${resume?.id}`)
                                      }
                                      to={{ pathname: "" }}
                                    >
                                      <p className="text-blue-800">
                                        {resume?.name}
                                      </p>
                                    </Link>
                                    {/* <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                           
                          </div>
                          <div className="px-4 py-2"></div>
                        </div> */}
                                  </li>
                                ) : (
                                  resume.public && (
                                    <li key={jj}>
                                      <Link
                                        onClick={() =>
                                          history.push(`/r/${resume.id}`)
                                        }
                                        to={{ pathname: "" }}
                                      >
                                        <p className="text-blue-800">
                                          {resume.name}
                                        </p>
                                      </Link>
                                      {/* <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                        
                                        </div>
                                        <div className="px-4 py-2"></div>
                                      </div> */}
                                    </li>
                                  )
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                      {/* End of Experience and education grid */}
                    </div>
                  ) : null}

                  <div className="my-4" />
                  {isOwnAccount() && (
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                      <ItemsContainer>
                        <ProfileDetails type="socials">
                          <Details type="socials">
                            <Info>
                              Once you delete your account, it cannot be undone.
                              This is permanent.
                            </Info>
                            {/* Reusing the upgrade button */}

                            <UpgradeButton
                              className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                              onClick={handleClick}
                              type="delete"
                            >
                              Delete Account
                            </UpgradeButton>
                          </Details>
                        </ProfileDetails>
                      </ItemsContainer>
                    </div>
                  )}
                  {/* End of profile tab */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const ItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 24px 40px;
  border-radius: 6px;
  align-items: center;
  margin-bottom: 28px;
`;
const Info = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: ${(props) =>
    props.type === "connect" ? "rgb(33, 150, 243)" : "rgb(152, 161, 179)}"};
  cursor: ${(props) => (props.type === "connect" ? "pointer" : "")};
  max-width: 448px;
  margin-bottom: 3px;

  span {
    color: rgb(33, 150, 243);
  }
`;
const UpgradeButton = styled.div`
  font-size: 17px;
  line-height: 24px;
  cursor: pointer;
  color: ${(props) =>
    props.type === "delete" ? "rgb(255, 76, 76)" : "rgb(33, 150, 243)"};
`;
const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.type === "socials" ? "100%" : "400px")};
`;
const Details = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.type === "socials" ? "space-between" : "auto"};
  margin-bottom: 13px;
  border-bottom: ${(props) =>
    props.type === "socials" ? "none" : "1px solid #ccc"};
`;
export default SeekerProfileForm;
