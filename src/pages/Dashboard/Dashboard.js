/* eslint-disable react-hooks/rules-of-hooks */
import { openModal } from "@redq/reuse-modal";
import axios from "axios";
import {
  InkPen,
  Members,
  RefundIcon,
  SearchIcon,
  SiteSettings,
} from "components/AllSvgIcon";
import Button from "components/Button/Button";
import Error500 from "components/Error/Error500";
import ImageWrapper from "components/Image/Image";
import Loader from "components/Loader/Loader";
import { BASE_URL, CURRENCY } from "constants/constants";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import ResendEmail from "containers/SignInOutForm/resendEmail";
import { useAppState, useStickyDispatch } from "contexts/app/app.provider";
import { AuthContext } from "contexts/auth/auth.context";
import {
  addObjectToLocalStorageObject,
  addToLocalStorageArray,
  tokenConfig,
} from "helpers";
import _ from "lodash";
import { categorySelector, getApplications } from "pages/common/helpers";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  BoxContent,
  BoxCounter,
  BoxIcon,
  CategoriesContainer,
  CategoryBox,
  H4,
  LeftContent,
  ListingIcons,
  ListingLogo,
  ListingTitle,
  ListSpan,
  MainContentArea,
  TypeList,
} from "styles/pages.style";
import ApplicationModal from "../common/ApplicationModal";
import { CardWrapper, LinkButton, Offer } from "./Dashboard.style";

function Dashboard() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const history = useHistory();
  const [jobs, setJobs] = useState(null);
  const [count, setCount] = useState();
  const [error, setError] = useState(false);
  const [applications, setApplications] = useState(null);
  const [applicants, setApplicants] = useState(null);
  const [loading, setLoading] = useState(true);
  const reload = useAppState("isReload");

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);

      // if (
      //   JSON.parse(localStorage.getItem("thedb_auth_profile"))["is_individual"]
      // ) {
      console.log("1");
      axios
        .get(`${BASE_URL}/jobs/applications/`, tokenConfig())
        .then(async (res) => {
          console.log("applicant data", res.data);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const allApplications = res.data.results
            .filter(
              (filteredApplications) =>
                filteredApplications.applicant ===
                JSON.parse(localStorage.getItem("thedb_auth_profile"))["id"]
            )
            // eslint-disable-next-line array-callback-return
            .reduce((arr, b) => {
              arr.push(b.job);
              return arr;
            }, []);
          console.log("applications", allApplications, allApplications.length);
          setApplications(allApplications);
          // addToLocalStorageArray("thedb_applications", allApplications);
        })
        .catch((err) => {
          console.log("error", err);
        });
      // } else {
      console.log("2");
      axios
        .get(`${BASE_URL}/jobs/`, tokenConfig())
        .then(async (res) => {
          const jobs = res.data.results
            .filter(
              (filteredJobs) =>
                filteredJobs.creator ===
                JSON.parse(localStorage.getItem("thedb_auth_profile"))["id"]
            )
            // eslint-disable-next-line array-callback-return
            .reduce((arr, b) => {
              arr.push(b.id);
              return arr;
            }, []);
          await new Promise((resolve) => setTimeout(resolve, 500));
          axios
            .get(`${BASE_URL}/jobs/applications/`, tokenConfig())
            .then(async (res) => {
              console.log("applicant data", res.data);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              const allApplicants = res.data.results
                .filter((filteredApplications) =>
                  jobs.includes(filteredApplications.job)
                )
                // eslint-disable-next-line array-callback-return
                .reduce((arr, b) => {
                  arr.push(b.id);
                  addToLocalStorageArray("thedb_applicants", b.id);
                  return arr;
                }, []);
              console.log("applicants", allApplicants, typeof allApplicants);
              setApplicants(allApplicants);
              // addToLocalStorageArray("thedb_applicants", allApplicants);
            })
            .catch((err) => {
              console.log("error", err);
            });
        })
        .catch((err) => {
          console.log("error", err);
        });
      // }

      if (
        JSON.parse(localStorage.getItem("thedb_auth_profile"))["is_individual"]
      ) {
        try {
          axios
            .get(`${BASE_URL}/individual/`, tokenConfig())
            .then((res) => {
              console.log("res individual", res.data);
              const individual = res.data.results.filter(
                (filteredIndividual) =>
                  filteredIndividual.user ===
                  JSON.parse(localStorage.getItem("thedb_auth_profile"))["id"]
              );
              if (individual.length > 0) {
                addObjectToLocalStorageObject(
                  "thedb_individual_profile",
                  individual[0]
                );
              }
            })
            .catch((err) => {
              setError(err);
            });
          getApplications();
        } catch (error) {
          setError(error);
        }
      } else {
        try {
          axios
            .get(`${BASE_URL}/organization/`, tokenConfig())
            .then((res) => {
              console.log("res org", res.data);
              const organization = res.data.results.filter(
                (filteredCompany) => filteredCompany.user === profile.id
              );
              if (organization.length > 0) {
                addObjectToLocalStorageObject(
                  "thedb_org_profile",
                  organization[0]
                );
              }
            })
            .catch((err) => {
              setError(err);
            });
        } catch (error) {
          setError(error);
        }
      }
      try {
        axios
          .get(`${BASE_URL}/jobs/`, tokenConfig())
          .then((res) => {
            console.log("industry data", res.data.results);
            var results = res.data.results;
            // var results = res.data.results.reduce((acc, d) => {
            //   acc.push({
            //     ...d,
            //     picture: getOrgLogo(d.creator),
            //   });
            //   return acc;
            // }, []);

            // results = results.push("picture": getOrgLogo(job.creator))
            console.log("testing data", results);

            setJobs(results);
            setCount(
              _.countBy(
                res.data.results.filter(
                  (filteredJob) => filteredJob.creator === profile.id
                ),
                "job_type"
              )
            );
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setError(err);
            setLoading(false);
          });
      } catch (error) {
        setError(error);
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const useDispatch = useStickyDispatch();
  const setForm = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const toggleManage = (category, id) => {
    setForm();
    history.push(`/dashboard/${category}/${id}`);
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
                <LinkButton onClick={() => history.push("/dashboard/profile")}>
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
      <H4>Dashboard</H4>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MainContentArea>
            <CategoriesContainer>
              {profile.is_individual ? (
                <>
                  <CategoryBox>
                    <BoxIcon>
                      <InkPen />
                    </BoxIcon>
                    <BoxCounter>
                      {applications ? applications.length : 0}
                    </BoxCounter>
                    <BoxContent>Total Applications</BoxContent>
                  </CategoryBox>
                  <CategoryBox>
                    <BoxIcon>
                      <Members />
                    </BoxIcon>
                    <BoxCounter>
                      {applicants ? applicants.length : 0}
                    </BoxCounter>
                    <BoxContent>Gig Applicants</BoxContent>
                  </CategoryBox>
                </>
              ) : (
                <>
                  <CategoryBox>
                    <BoxIcon>
                      <Members />
                    </BoxIcon>
                    <BoxCounter>
                      {applicants ? applicants.length : 0}
                    </BoxCounter>
                    <BoxContent>Total Applicants</BoxContent>
                  </CategoryBox>
                  <CategoryBox>
                    <BoxIcon>
                      <SiteSettings />
                    </BoxIcon>
                    <BoxCounter>
                      {count.Internship ? count.Internship : 0}
                    </BoxCounter>
                    <BoxContent>My Internships</BoxContent>
                  </CategoryBox>
                  <CategoryBox>
                    <BoxCounter>
                      {(count.parttime ? count.parttime : 0) +
                        (count.fulltime ? count.fulltime : 0) +
                        (count.Volunteering ? count.Volunteering : 0)}
                    </BoxCounter>
                    <BoxIcon>
                      <SiteSettings />
                    </BoxIcon>
                    <BoxContent>My Jobs</BoxContent>
                  </CategoryBox>
                </>
              )}

              <CategoryBox>
                <BoxIcon>
                  <SiteSettings />
                </BoxIcon>
                <BoxCounter>{count.Gig ? count.Gig : 0}</BoxCounter>
                <BoxContent>My Gigs</BoxContent>
              </CategoryBox>
            </CategoriesContainer>
          </MainContentArea>
          <LeftContent>
            <>
              {jobs !== null && jobs.length > 0 ? (
                <ul>
                  {jobs.map((job, index) => (
                    <li key={index} className={`${job.job_type}`}>
                      <section>
                        <ListingLogo>
                          <ImageWrapper
                            // url={job.picture}
                            alt={"company logo"}
                            id={job.creator}
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
                                  title={`Manage`}
                                  // disabled={!profile.is_verified}
                                  style={{
                                    fontSize: 15,
                                    color: "#21277f",
                                    backgroundColor: "#e6c018",
                                    // float: "left",
                                    height: "29px",
                                    margin: "0 10px",
                                  }}
                                />
                              ) : (
                                <>
                                  {profile.is_individual ? (
                                    <>
                                      {applications ? (
                                        <>
                                          {applications.includes(job.id) ? (
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
                                  width: "85%",
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
                    </li>
                  ))}
                </ul>
              ) : (
                <div>Sorry No recent listings available</div>
              )}
            </>
          </LeftContent>
        </>
      )}
    </CardWrapper>
  );
}

export default Dashboard;
