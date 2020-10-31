/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext, useCallback } from "react";
import { CardWrapper } from "./Internships.style";
import axios from "axios";
import { BASE_URL, CURRENCY } from "constants/constants";
import { tokenConfig } from "helpers";
import ImageWrapper from "components/Image/Image";
import {
  LeftContent,
  ListingLogo,
  ListingTitle,
  H4,
  TypeList,
  ListSpan,
  ListingIcons,
} from "styles/pages.style";
import { SearchIcon, RefundIcon } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import ResendEmail from "containers/SignInOutForm/resendEmail";
import { AuthContext } from "contexts/auth/auth.context";
import ApplicationModal from "pages/common/ApplicationModal";
import { openModal, closeModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import Loader from "components/Loader/Loader";
import { useStickyDispatch } from "contexts/app/app.provider";
import { useAppState } from "contexts/app/app.provider";
import Error500 from "components/Error/Error500";
import { categorySelector } from "pages/common/helpers";
import { useHistory } from "react-router-dom";
import { Offer, LinkButton } from "pages/common/style";
import InternshipPost from "./InternshipPost";

function MyInternships() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [internships, setInternships] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  const currentForm = useAppState("currentForm");
  const isPost = currentForm === "post";

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/jobs/`, tokenConfig())
        .then((res) => {
          console.log("industry data", res.data.results);
          setInternships(
            res.data.results.filter(
              (filteredJob) => filteredJob.creator === profile.id
            )
          );
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Catching Errors:", err);
          setError(err);
        });
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useDispatch = useStickyDispatch();
  const setManage = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const setPost = useCallback(() => useDispatch({ type: "POST" }), [
    useDispatch,
  ]);
  const toggleManage = (category, id) => {
    setManage();
    history.push(`/dashboard/${category}/${id}`);
  };
  const togglePost = () => {
    setPost();
  };
  const handleModal = (text, subtext, fxn) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => EmailVerificationModal(text, subtext, fxn),
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };
  const handleApplication = (jobId) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: localStorage.getItem("thedb_individual_profile")
        ? () => ApplicationModal(jobId)
        : () =>
            EmailVerificationModal(
              `Hey ${profile.full_name}`,
              "Complete your 'Additional Details' profile to apply for this job",
              <Offer style={{ padding: "10px 0" }}>
                Update{" "}
                <LinkButton
                  onClick={() => {
                    closeModal();
                    history.push("/dashboard/profile");
                  }}
                >
                  Profile
                </LinkButton>
              </Offer>
            ),
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <CardWrapper>
      {isPost ? null : (
        <H4>
          Internships{" "}
          {profile.is_individual ? null : (
            <Button
              onClick={() =>
                profile.is_verified
                  ? togglePost()
                  : handleModal("Confirm Email First to post an internship")
              }
              size="small"
              title="Post Internship"
              // disabled={!profile.is_verified}
              style={{
                fontSize: 15,
                color: "#21277f",
                backgroundColor: profile.is_verified ? "#e6c018" : "#f2f2f2",
                float: "right",
              }}
            />
          )}
        </H4>
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentForm === "view" && (
            <LeftContent>
              <ul>
                {internships
                  .filter(
                    (filteredJob) =>
                      filteredJob.job_type === "internship" ||
                      filteredJob.job_type === "Internship"
                  )
                  .map((job, index) => (
                    <li key={index} className={`${job.job_type}`}>
                      {job !== null || job !== undefined ? (
                        <section>
                          <ListingLogo>
                            <ImageWrapper
                              url={job.companyLogo}
                              alt={"company logo"}
                            />
                          </ListingLogo>
                          <ListingTitle>
                            <h3>
                              {job.title}

                              <TypeList>
                                <ListSpan className={`${job.job_type}`}>
                                  {job.job_type}
                                </ListSpan>

                                {job.creator === profile.id ? (
                                  <Button
                                    onClick={() =>
                                      toggleManage(
                                        categorySelector(job.job_type),
                                        job.id
                                      )
                                    }
                                    size="small"
                                    title={`Manage Internship`}
                                    disabled={!profile.is_verified}
                                    style={{
                                      fontSize: 15,
                                      color: "#21277f",
                                      backgroundColor: "#e6c018",
                                      float: "right",
                                      height: "29px",
                                      margin: "0 0 0 10px",
                                    }}
                                  />
                                ) : (
                                  <>
                                    {profile.is_individual ? (
                                      <>
                                        {localStorage.getItem(
                                          "thedb_applications"
                                        ) ? (
                                          <>
                                            {localStorage
                                              .getItem("thedb_applications")
                                              .includes(job.id) ? (
                                              <Button
                                                onClick={() =>
                                                  profile.is_verified
                                                    ? handleApplication(job.id)
                                                    : handleModal(
                                                        `Confrim email to Apply`,
                                                        `or`,
                                                        <Button
                                                          onClick={() =>
                                                            openModal({
                                                              show: true,
                                                              overlayClassName:
                                                                "quick-view-overlay",
                                                              closeOnClickOutside: true,
                                                              component: ResendEmail,
                                                              closeComponent:
                                                                "",
                                                              config: {
                                                                enableResizing: false,
                                                                disableDragging: true,
                                                                className:
                                                                  "quick-view-modal",
                                                                width: 458,
                                                                height: "auto",
                                                              },
                                                            })
                                                          }
                                                          size="small"
                                                          title={`Send email again`}
                                                          style={{
                                                            fontSize: 15,
                                                            color: "#fff",
                                                            backgroundColor:
                                                              "#e618a5",
                                                            margin: "10px 10px",
                                                          }}
                                                        />
                                                      )
                                                }
                                                size="small"
                                                title={`Applied ✔`}
                                                disabled={true}
                                                style={{
                                                  fontSize: 15,
                                                  color: "#21277f",
                                                  backgroundColor: "#f2f2f2",
                                                  float: "right",
                                                  height: "29px",
                                                  margin: "0 0 0 10px",
                                                }}
                                              />
                                            ) : (
                                              <Button
                                                onClick={() =>
                                                  profile.is_verified
                                                    ? handleApplication(job.id)
                                                    : handleModal(
                                                        `Confrim email to Apply`,
                                                        `or`,
                                                        <Button
                                                          onClick={() =>
                                                            openModal({
                                                              show: true,
                                                              overlayClassName:
                                                                "quick-view-overlay",
                                                              closeOnClickOutside: true,
                                                              component: ResendEmail,
                                                              closeComponent:
                                                                "",
                                                              config: {
                                                                enableResizing: false,
                                                                disableDragging: true,
                                                                className:
                                                                  "quick-view-modal",
                                                                width: 458,
                                                                height: "auto",
                                                              },
                                                            })
                                                          }
                                                          size="small"
                                                          title={`Send email again`}
                                                          style={{
                                                            fontSize: 15,
                                                            color: "#fff",
                                                            backgroundColor:
                                                              "#e618a5",
                                                            margin: "10px 10px",
                                                          }}
                                                        />
                                                      )
                                                }
                                                size="small"
                                                title={`Apply`}
                                                // disabled={!profile.is_verified}
                                                style={{
                                                  fontSize: 15,
                                                  color: "#21277f",
                                                  backgroundColor: profile.is_verified
                                                    ? "#e6c018"
                                                    : "#f2f2f2",
                                                  float: "right",
                                                  height: "29px",
                                                  margin: "0 0 0 10px",
                                                }}
                                              />
                                            )}
                                          </>
                                        ) : (
                                          <Button
                                            onClick={() =>
                                              profile.is_verified
                                                ? handleApplication(job.id)
                                                : handleModal(
                                                    `Confrim email to Apply`,
                                                    `or`,
                                                    <Button
                                                      onClick={() =>
                                                        openModal({
                                                          show: true,
                                                          overlayClassName:
                                                            "quick-view-overlay",
                                                          closeOnClickOutside: true,
                                                          component: ResendEmail,
                                                          closeComponent: "",
                                                          config: {
                                                            enableResizing: false,
                                                            disableDragging: true,
                                                            className:
                                                              "quick-view-modal",
                                                            width: 458,
                                                            height: "auto",
                                                          },
                                                        })
                                                      }
                                                      size="small"
                                                      title={`Send email again`}
                                                      style={{
                                                        fontSize: 15,
                                                        color: "#fff",
                                                        backgroundColor:
                                                          "#e618a5",
                                                        margin: "10px 10px",
                                                      }}
                                                    />
                                                  )
                                            }
                                            size="small"
                                            title={`Apply`}
                                            // disabled={!profile.is_verified}
                                            style={{
                                              fontSize: 15,
                                              color: "#21277f",
                                              backgroundColor: profile.is_verified
                                                ? "#e6c018"
                                                : "#f2f2f2",
                                              float: "right",
                                              height: "29px",
                                              margin: "0 0 0 10px",
                                            }}
                                          />
                                        )}
                                      </>
                                    ) : null}
                                  </>
                                )}
                              </TypeList>
                            </h3>
                            <ListingIcons>
                              <li>
                                <div
                                  className={`description`}
                                  style={{
                                    height: "20px",
                                    width: "100%",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: job.description,
                                  }}
                                />
                              </li>
                              <li>
                                <SearchIcon />
                                {job.location}
                              </li>
                              <li>
                                <RefundIcon />
                                {CURRENCY}

                                {job.salary}
                              </li>
                            </ListingIcons>
                          </ListingTitle>
                        </section>
                      ) : (
                        <div>Sorry, No Internships posted recently</div>
                      )}
                    </li>
                  ))}
                {internships.filter(
                  (filteredJob) =>
                    filteredJob.job_type === "internship" ||
                    filteredJob.job_type === "Internship"
                ).length > 0 ? null : (
                  <div>Sorry No Internships posted recently</div>
                )}
              </ul>
            </LeftContent>
          )}
          {currentForm === "post" && <InternshipPost profileID={profile.id} />}
        </>
      )}
    </CardWrapper>
  );
}

export default MyInternships;