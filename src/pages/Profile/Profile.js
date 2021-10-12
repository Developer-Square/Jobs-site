import PasswordChange from "containers/Authentication/PasswordChange";
import React, { lazy, Suspense } from "react";
import BaseProfile from "./BaseProfile";
import EmployerProfile from "./EmployerProfile";
import InstitutionProfile from "./InstitutionProfile";
import SeekerProfile from "./SeekerProfile";
import CreateAddress from "containers/Address/AddressCreate";
import AddressPreview from "containers/Address/AddressSummary";
import { useQuery } from "react-apollo";
import { GET_USER_DETAILS } from "graphql/queries";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import styled from "styled-components";
import UserContext from "contexts/user/user.provider";
import ModalContext from "contexts/modal/modal.provider";

const SeekerProfileForm = lazy(() => import("pages/Profile/SeekerProfileForm"));
const EmployerProfileForm = lazy(() =>
  import("pages/Profile/EmployerProfileForm"),
);

function Profile() {
  const [edit, setEdit] = React.useState(false);
  const { user } = React.useContext(UserContext);
  const { emitter, events } = React.useContext(ModalContext);
  const [settings, setSettings] = React.useState(false);
  const handleDelete = () => emitter.emit(events.DELETE_MODAL);

  const { data, loading } = useQuery(GET_USER_DETAILS);
  if (loading) {
    return <Loader />;
  }
  const progressColor = (x) => {
    if (x > 50) {
      return "bg-green";
    }
    if (x >= 25 && x <= 50) {
      return "bg-yellow";
    }
    if (x < 25 && x > 10) {
      return "bg-gray";
    }
    if (x <= 10) {
      return "bg-red";
    }

    return "bg-red";
  };

  return (
    <>
      <div className="flex flex-wrap my-5 pl-5 pr-5">
        <RightBtn className="ml-auto">
          <Button
            title={!edit ? "Edit" : "View Profile"}
            onClick={() => setEdit((curr) => !curr)}
          />
        </RightBtn>
      </div>
      <div className="flex flex-wrap justify-center">
        <h5 className="text-gray-900 font-bold text-xl leading-8 my-1 mr-6">
          Account Completion{" "}
        </h5>
        <div className="w-3/4">
          <div className="shadow rounded border-2 border-gray-400 flex my-1 relative">
            {/* <div className="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div> */}
            <div
              className={`cursor-default ${progressColor(
                user?.progress,
              )}-400 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white`}
              style={{
                width: `${user?.progress}%`,
              }}
            >
              <div className="absolute left-0 mx-8 text-gray-700">
                {user?.progress}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={!edit ? "col-lg-12 col-md-12" : "col-md-12"}></div>
      {!edit ? (
        user && (
          <Suspense fallBack={<Loader />}>
            {user?.isEmployer && <EmployerProfileForm details={user} />}
            {user?.isSeeker && <SeekerProfileForm details={user} />}
          </Suspense>
        )
      ) : (
        <>
          <section className="py-1 bg-blueGray-50">
            <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      My account
                    </h6>
                    <button
                      onClick={() => setSettings((curr) => !curr)}
                      className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      {settings ? "profile" : "settings"}
                    </button>
                  </div>
                </div>

                {settings ? (
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gray-100">
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Change Password
                    </h6>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <PasswordChange />
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Delete Account
                    </h6>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                        {/*content*/}
                        <div className>
                          {/*body*/}
                          <div className="text-center p-5 flex-auto justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-16 h-16 flex items-center text-red-500 mx-auto"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <h2 className="text-xl font-bold py-4 ">
                              Are you sure?
                            </h2>
                            <p className="text-sm text-gray-500 px-8">
                              Do you really want to delete your account? This
                              process cannot be undone
                            </p>
                          </div>
                          {/*footer*/}
                          <div className="p-3  mt-2 text-center space-x-4 md:block">
                            <button
                              onClick={handleDelete}
                              className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                  </div>
                ) : (
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gray-100">
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Account Details
                    </h6>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <BaseProfile />
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Addresses
                    </h6>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 auto-rows-max ">
                        {data?.me && (
                          <>
                            <CreateAddress />

                            {data?.me?.addresses.map((x) => (
                              <AddressPreview key={x.id} address={x} />
                            ))}
                          </>
                        )}
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      About Me
                    </h6>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                      {user?.isInstitution && <InstitutionProfile />}
                      {user?.isSeeker && <SeekerProfile />}
                      {user?.isEmployer && <EmployerProfile />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

const RightBtn = styled.div`
  float: right;
`;

export default Profile;
