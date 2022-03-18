import React from "react";
import gql from "graphql-tag";
// import { jsPDF } from "jspdf";
import Loader from "components/Loader/Loader";
import { useLazyQuery, useMutation } from "react-apollo";
import styled from "styled-components";
import { useRouteMatch } from "react-router";
import { getGraphqlIdFromDBId } from "utils";
import { APPLICATION_DETAIL_QUERY } from "graphql/queries";
import { getStatus } from "utils/vacancy";
import NoResultFound from "components/NoResult/NoResult";
import PDFViewer from "components/PDFViewer";
import ResumeViewer from "pages/Resume/view";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ConstantsContext from "contexts/constants/constants.provider";

const animatedComponents = makeAnimated();

export const UPDATE_APPLICATION_STATUS = gql`
  mutation PatchApplication($id: ID!, $status: ApplicationStatus) {
    patchApplication(id: $id, input: { status: $status }) {
      __typename
      success
      application {
        id
        screeningAnswers {
          id
          isActive
          isDeleted
          question {
            id
            question
            required
            idealAnswer
          }
          answer
        }
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
          socials {
            id
            link
            network
            username
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

  const { applicationStatus } = React.useContext(ConstantsContext);

  const [
    getApp,
    {
      data: applicationData,
      loading: applictionLoading,
      error: applicationError,
    },
  ] = useLazyQuery(APPLICATION_DETAIL_QUERY);

  const [updateStatus] = useMutation(UPDATE_APPLICATION_STATUS);

  React.useEffect(() => {
    getApp({
      variables: {
        id: match.params.applicationID
          ? getGraphqlIdFromDBId(match.params.applicationID, "Application")
          : "",
      },
    });
  }, [getApp, match.params.applicationID]);

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
    if (status) {
      updateStatus({
        variables: {
          id: getGraphqlIdFromDBId(match.params.applicationID, "Application"),
          status: status,
        },
      }).then(({ data }) =>
        getApp({
          variables: {
            id: match.params.applicationID
              ? getGraphqlIdFromDBId(match.params.applicationID, "Application")
              : "",
          },
        }),
      );
    }
  };

  console.log(applicationData);

  if (applicationError) return `Error! ${applicationError}`;

  return (
    <div>
      <nav className="flex flex-col sm:flex-row border">
        <div className="flex flex-col text-center md:text-left">
          <div className="font-medium text-lg text-gray-800">Change Status</div>
        </div>
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          defaultValue={applicationStatus.find(
            (a) => a.value === applicationData.jobApplication?.status,
          )}
          options={applicationStatus}
          onChange={(val) => updateApplicationStatus(val?.value)}
        />
      </nav>
      <div className="w-full mx-auto z-10">
        <div className="flex flex-col">
          <div className="bg-white flex items-center p-4 m-1 mt-0 mx-0 rounded-sm shadow border">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {applicationData.jobApplication?.applicant?.avatar?.url ? (
                <img
                  alt="ppa"
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={applicationData.jobApplication?.applicant?.avatar?.url}
                />
              ) : (
                <div className="w-32 object-cover rounded-2xl">
                  {
                    getStatus(applicationData.jobApplication?.status)
                      ?.statusImage
                  }
                </div>
              )}

              <div className="flex flex-col text-center md:text-left">
                <div className="font-medium text-lg text-gray-800">
                  {applicationData.jobApplication?.applicant?.fullName}
                </div>
                <div className="text-gray-500 mb-3 whitespace-nowrap">
                  {applicationData.jobApplication?.applicant?.seeker?.title}
                </div>
                <div className="flex text-gray-500 mb-3 whitespace-nowrap">
                  {applicationData.jobApplication?.applicant?.socials?.length >
                  0
                    ? applicationData.jobApplication?.applicant?.socials?.map(
                        (social) => {
                          return (
                            <Details key={social.id} type="socials">
                              <Socials>
                                <a href={`${social.link}${social.username}`}>
                                  <span
                                    className="iconify"
                                    data-icon={`bi:${social.network?.toLowerCase()}`}
                                  ></span>
                                </a>
                              </Socials>
                            </Details>
                          );
                        },
                      )
                    : "No socials added"}
                </div>
              </div>
            </div>

            <div className="flex-grow p-3" />
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
            className={`bg-white flex items-center p-4 m-1 mx-0 rounded-sm shadow border`}
          >
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Question</th>
                    <th className="px-4 py-3">Ideal Answer</th>
                    <th className="px-4 py-3">Answer</th>
                    <th className="px-4 py-3">Required</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {applicationData.jobApplication?.screeningAnswers?.map(
                    (a, i) => (
                      <tr className="text-gray-700" key={i}>
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <p className="font-semibold text-black">
                              {a?.question?.question}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {a?.question?.idealAnswer}
                        </td>
                        <td className="px-4 py-3 text-xs border">
                          <span
                            className={
                              a?.question?.questionType === "LNG_TXT"
                                ? "px-2 py-1 font-semibold leading-tight text-orange-700 bg-gray-100 rounded-sm"
                                : a?.answer === a?.question?.idealAnswer
                                ? "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"
                                : "px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"
                            }
                          >
                            {a?.answer}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          {a?.question?.required ? "Yes " : "No "}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
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
                      <i className="fa fa-file"></i>
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

const Socials = styled.div`
  display: flex;

  svg {
    margin-top: 1px;
    margin-right: 10px;
    font-size: 20px;
  }
`;
const Details = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.type === "socials" ? "space-between" : "auto"};
  margin-bottom: 13px;
  border-bottom: ${(props) =>
    props.type === "socials" ? "none" : "1px solid #ccc"};
`;
export default ApplicationView;
