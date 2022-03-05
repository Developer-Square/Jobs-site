import React from "react";
import gql from "graphql-tag";
import Loader from "components/Loader/Loader";
import { useQuery, useMutation } from "react-apollo";
import moment from "moment";
import { useRouteMatch } from "react-router";
import { getGraphqlIdFromDBId } from "utils";
import { APPLICATION_DETAIL_QUERY } from "graphql/queries";
import { getStatus } from "utils/vacancy";
import NoResultFound from "components/NoResult/NoResult";
import PDFViewer from "components/PDFViewer";
import ResumeViewer from "pages/Resume/view";

export const UPDATE_APPLICATION_STATUS = gql`
  mutation PatchApplication($id: ID!, $status: ApplicationStatus) {
    patchApplication(id: $id, input: { status: $status }) {
      __typename
      success
      application {
        id
        inbuiltResume {
          id
        }
        extraAttachment
        applicant {
          id
          fullName
          email
          phone
          progress
          seeker {
            status
            title
          }
          avatar {
            url
            alt
          }
        }
        job {
          id
          title
          creator {
            id
            fullName
            email
            phone
            avatar {
              url
              alt
            }
          }
        }
        appliedOn
        resume
        budget
        comment
        status
        favourite
        employerComment
      }
      errors {
        field
        message
      }
    }
  }
`;

const ApplicationView = () => {
  const match = useRouteMatch();
  const [viewPDF, setViewPDF] = React.useState(false);
  const [viewAttachment, setViewAttachment] = React.useState(false);

  const { data: applicationData, loading: applictionLoading } = useQuery(
    APPLICATION_DETAIL_QUERY,
    {
      variables: {
        id: match.params.applicationID
          ? getGraphqlIdFromDBId(match.params.applicationID, "Application")
          : "",
      },
    },
  );

  const [updateStatus] = useMutation(UPDATE_APPLICATION_STATUS);

  const handleViewCV = () => {
    return null;
  };

  if (applictionLoading) {
    return <Loader />;
  }
  if (!applicationData) {
    return <NoResultFound />;
  }
  const updateApplicationStatus = (status) => {
    if (status === "Applied") {
      updateStatus({
        variables: {
          id: getGraphqlIdFromDBId(match.params.applicationID, "Application"),
          status: "SHORTLISTED",
        },
      });
    }
    if (status === "Shortlisted") {
      updateStatus({
        variables: {
          id: getGraphqlIdFromDBId(match.params.applicationID, "Application"),
          status: "INTERVIEWING",
        },
      });
    }
    if (status === "Interviewing") {
      updateStatus({
        variables: {
          id: getGraphqlIdFromDBId(match.params.applicationID, "Application"),
          status: "HIRED",
        },
      });
    }
    if (status === "Declined") {
      updateStatus({
        variables: {
          id: getGraphqlIdFromDBId(match.params.applicationID, "Application"),
          status: "DECLINED",
        },
      });
    }
  };

  console.log(applicationData);

  return (
    <div>
      <nav className="flex flex-col sm:flex-row border">
        <button
          onClick={() =>
            updateApplicationStatus(
              getStatus(applicationData.jobApplication?.status)?.name,
            )
          }
          className={`relative text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none overflow-visible`}
        >
          Change Status, Current -{" "}
          {getStatus(applicationData.jobApplication?.status)?.name}
        </button>
        <button
          onClick={() => updateApplicationStatus("DECLINED")}
          className={`relative text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none overflow-visible`}
        >
          Decline
        </button>
        {/* <button
          className={`relative text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none overflow-visible`}
        >
          Message
        </button> */}
      </nav>
      <div className="w-full mx-auto z-10">
        <div className="flex flex-col">
          <div className="bg-white flex items-center p-4 m-1 mt-0 mx-0 rounded-sm shadow border">
            <div className="flex items-center space-x-4">
              {applicationData.jobApplication?.applicant?.avatar?.url ? (
                <img
                  src={applicationData.jobApplication?.applicant?.avatar?.url}
                  alt="p"
                  className="w-32 object-cover rounded-2xl"
                />
              ) : (
                <div className="w-32 object-cover rounded-2xl">
                  {
                    getStatus(applicationData.jobApplication?.status)
                      ?.statusImage
                  }
                </div>
              )}
            </div>
            <div className="flex-grow p-3">
              <div className="font-semibold text-gray-700">
                {applicationData.jobApplication?.applicant?.fullName}
              </div>
              <div className="text-sm text-gray-500">
                <span className="mr-3 text-lg font-bold leading-none text-gray-500">
                  {applicationData.jobApplication?.applicant?.seeker?.title}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <div className="flex-1 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <p>
                    Applied :{" "}
                    {moment(
                      applicationData.jobApplication?.createdAt,
                    )?.fromNow()}
                  </p>
                  {applicationData.jobApplication?.applicant?.seeker
                    .location && (
                    <>
                      <i className="fa fa-map-marker mx-2" />{" "}
                      <p>
                        {
                          applicationData.jobApplication?.applicant?.seeker
                            .location
                        }
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => {
                  setViewPDF((previous) => !previous);
                  handleViewCV(applicationData.jobApplication);
                }}
                className="flex-no-shrink border border-black bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
              >
                {viewPDF ? "View Cover Letter" : "View CV"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto z-10">
        <div className="flex flex-col">
          <div
            className={`bg-white flex items-center p-4 m-1 mx-0 rounded-sm shadow border ${
              viewPDF || viewAttachment ? "justify-center" : ""
            }`}
          >
            {viewAttachment ? (
              <PDFViewer
                file={applicationData.jobApplication?.extraAttachment}
              />
            ) : viewPDF ? (
              applicationData.jobApplication?.inbuiltResume ? (
                <ResumeViewer
                  id={applicationData.jobApplication?.inbuiltResume.id}
                />
              ) : (
                <PDFViewer file={applicationData.jobApplication?.resume} />
              )
            ) : applicationData.jobApplication?.comment ? (
              <p className="mt-4 text-gray-600">
                {applicationData.jobApplication?.comment}
              </p>
            ) : (
              <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                <div className="max-w-md text-center ">
                  <div className="text-3xl font-dark font-bold">Hi There,</div>
                  <p className="text-2xl md:text-3xl font-light leading-normal">
                    Sorry we couldn't find the cover letter.{" "}
                  </p>
                  <p className="mb-8">
                    But dont worry, you can find plenty of other candidates who
                    have cover letters if you featre this job.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mx-auto z-10">
        <div className="flex flex-col">
          <div className="bg-white flex items-center p-4 m-1 mx-0 rounded-sm shadow border">
            <div className="container flex flex-col md:flex-row items-center px-5 text-gray-700">
              <div className="max-w-md">
                <div className="text-xl font-dark font-bold">Attachments</div>

                {applicationData.jobApplication?.extraAttachment &&
                applicationData.jobApplication?.extraAttachment !== "" ? (
                  <button
                    onClick={() => setViewAttachment((previous) => !previous)}
                    className="apple bg-white shadow-md px-3 py-2 rounded-lg flex items-center space-x-4"
                  >
                    <div className="logo">
                      <i class="fa fa-file"></i>
                    </div>
                    <div className="text">
                      <p
                        className=" text-xs font-semibold text-gray-900"
                        style={{ fontSize: "0.5rem" }}
                      >
                        {viewAttachment ? "View Cover Letter" : "View document"}
                      </p>
                    </div>
                  </button>
                ) : (
                  "No Extra Attachments"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationView;
