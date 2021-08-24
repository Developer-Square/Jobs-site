import React from "react";
import LogoImg from "image/thedb.png";
import { useHistory, Link } from "react-router-dom";
import { getDBIdFromGraphqlId } from "utils";

const BlankResumeTemplate = ({ resume }) => {
  const history = useHistory();
  console.log(resume);
  const viewProfile = () => {
    history.push(
      `/p/${getDBIdFromGraphqlId(
        resume?.owner?.id,
        resume?.owner?.__typename,
      )}`,
    );
  };
  return (
    <div>
      <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
        <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
          <div className="w-full md:w-1/2">
            <div className="mb-10 lg:mb-20">
              <img
                style={{ height: "50px" }}
                src={LogoImg}
                alt={`logo-resume-img`}
                className="mx-auto"
              />
            </div>
            <div className="mb-10 md:mb-20 text-gray-600 font-light">
              <h3 className="font-black uppercase text-3l lg:text-5xl text-yellow-500 mb-10">
                {resume?.owner?.fullName}'s resume hasnt been completed yet
              </h3>
              <p>Try and view the user's profile.</p>
            </div>
            <div className="mb-20 md:mb-0">
              <Link
                to={{ pathname: "" }}
                onClick={() => viewProfile(resume)}
                className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-yellow-500 hover:text-yellow-600"
              >
                <i className="mdi mdi-arrow-left mr-2" />
                View Profile
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <div className="relative ">
              <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
                <span>O</span>
                <span>o</span>
                <span>p</span>
                <span>s</span>
                <span>!</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform" />
        <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform" />
      </div>
    </div>
  );
};

export default BlankResumeTemplate;
