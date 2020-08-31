/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import { closeModal, openModal } from "@redq/reuse-modal";
import axios from "axios";
import {
  CustomerIcon,
  Facebook,
  Google,
  Linkedin,
  Minus,
  PlusOutline,
  RefundIcon,
  SearchIcon,
  Twitter,
} from "components/AllSvgIcon";
import Button from "components/Button/Button";
import Error500 from "components/Error/Error500";
import ImageWrapper from "components/Image/Image";
import Loader from "components/Loader/Loader";
import { BASE_URL, CURRENCY } from "constants/constants";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import { useStickyDispatch } from "contexts/app/app.provider";
import { AuthContext } from "contexts/auth/auth.context";
import { tokenConfig } from "helpers";
import moment from "moment";
import ApplicationModal from "pages/common/ApplicationModal";
import { categorySelector } from "pages/common/helpers";
import { LinkButton, Offer } from "pages/common/style";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Center, ListingTitle, ListSpan } from "styles/pages.style";
import {
  CardWrapper,
  Col8,
  ContainerView,
  Experience,
  Header,
  Row,
  SocialIcons,
} from "../common/style";
import { LeftCol, RightCol } from "./SingleView.style";

const SingleView = ({ profileID }) => {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const match = useRouteMatch();
  const history = useHistory();
  const [job, setJob] = useState(null);
  const [account, setAccount] = useState(null);
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const userID = profileID ? profileID : match.params.singleJobId;
  const useDispatch = useStickyDispatch();
  const setView = useCallback(() => useDispatch({ type: "VIEW" }), [
    useDispatch,
  ]);
  const setEdit = useCallback(() => {
    useDispatch({ type: "EDIT" });
    history.push("/dashboard/profile");
  }, [useDispatch, history]);
  useEffect(() => {
    setView();
    try {
      axios
        .get(`${BASE_URL}/jobs/${userID}/`, tokenConfig())
        .then(async (res) => {
          console.log("res job", res.data);
          setJob(res.data);
          try {
            axios
              .get(`${BASE_URL}/accounts/${res.data.creator}/`, tokenConfig())
              .then((res) => {
                console.log("res account", res.data);
                setAccount(res.data);
                if (
                  res.data.organization === null &&
                  res.data.individual !== null
                ) {
                  try {
                    axios
                      .get(
                        `${BASE_URL}/individual/${res.data.individual}`,
                        tokenConfig()
                      )
                      .then((res) => {
                        console.log("res", res.data);
                        setUser(res.data);
                      })
                      .catch((err) => {
                        setError(err);
                        console.log("errors on profile individual", err);
                      });
                  } catch (error) {
                    setError(error);
                  }
                } else if (
                  res.data.individual === null &&
                  res.data.organization !== null
                ) {
                  try {
                    axios
                      .get(
                        `${BASE_URL}/organization/${res.data.organization}`,
                        tokenConfig()
                      )
                      .then((res) => {
                        console.log("res", res.data);
                        setOrg(res.data);
                      })
                      .catch((err) => {
                        setError(err);
                      });
                  } catch (error) {
                    setError(error);
                  }
                } else if (res.data.individual && res.data.organization) {
                  setMessage(
                    "Clash of the profiles. The user has conflicting individual and organization profiles"
                  );
                }
              })
              .catch((err) => {
                setError(err);
                console.log("errors on profile individual", err);
              });
          } catch (error) {
            setError(error);
          }
        })
        .catch((err) => {
          setError(err);
          console.log("errors on profile organization", err);
        });
    } catch (error) {
      setError(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setManage = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const toggleManage = (category, id) => {
    setManage();
    history.push(`/dashboard/${category}/${id}`);
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
  const handleModal = (text) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => EmailVerificationModal(text),
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
      {profileID ? null : (
        <>
          {profile.id === userID ? (
            <h4>
              Profile
              <Button
                onClick={setEdit}
                size="small"
                title={`Edit Your Profile`}
                style={{
                  fontSize: 15,
                  color: "#5918e6",
                  backgroundColor: "#e6c018",
                  float: "right",
                }}
              />
            </h4>
          ) : null}
        </>
      )}

      {loading ? (
        <Loader />
      ) : (
        <>
          {job && (
            <>
              <div>
                {/* Recent Jobs */}
                <LeftCol>
                  <div className="padding-right">
                    {/* Company Info */}
                    <div className="company-info left-company-logo">
                      <a href="">
                        {" "}
                        <ImageWrapper
                          className="company_logo"
                          // src="https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/Untitled-1-Recovered-150x150_036a17cc6b1cbce4285ea7c4d6a34e16.png"
                          src={org ? org.logo : user.image}
                          alt={account.full_name}
                          id={org ? org.user : user.user}
                        />
                      </a>
                      <div className="content">
                        <ListingTitle>
                          <h1>
                            <a href="">
                              {" "}
                              <strong>
                                {org ? org.name : account.full_name}
                              </strong>
                            </a>{" "}
                            <span className="company-tagline">
                              -{" "}
                              {org
                                ? `Organization posting`
                                : `Personal posting`}
                            </span>
                            <ListSpan className={`${job.job_type}`}>
                              {job.job_type}
                            </ListSpan>
                          </h1>
                        </ListingTitle>
                        <span style={{ display: "block" }}>
                          {org ? (
                            <a className="website" href={`${org.website}`}>
                              <i className="fa fa-link" /> Website -{" "}
                              {org.website}
                            </a>
                          ) : (
                            <p>{account.email}</p>
                          )}
                          <br />
                          <a href={`mailto:${account.email}`}>Send Message</a>
                        </span>
                        <br />
                      </div>
                      <div className="clearfix" />
                    </div>

                    <div className="single_job_listing">
                      <div className="job_description">
                        <p>
                          <strong>Job Description</strong>
                        </p>
                        <br />
                        <ul className="list-1">
                          <li>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: `${job.description}`,
                              }}
                            />
                            {/* {generateHTML(job.description)} */}
                          </li>
                        </ul>

                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                      </div>
                      <SocialIcons>
                        <li>
                          <a href="/">
                            <Facebook />
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <Linkedin />
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <Twitter />
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <Google />
                          </a>
                        </li>
                      </SocialIcons>
                      <div className="clearfix" />
                    </div>
                  </div>
                </LeftCol>
                {/* Widgets */}
                <RightCol>
                  {/* Sort by */}
                  <div className="widget">
                    <h4 style={{ borderBottom: "0", padding: "0" }}>
                      Job Overview
                    </h4>
                    <div className="job-overview">
                      <ul>
                        <li>
                          <PlusOutline />
                          <div>
                            <strong>Date Posted:</strong>
                            <span>
                              <time dateTime="2019-10-27">
                                Posted{" "}
                                {moment(new Date()).diff(
                                  moment(profile.applied_on),
                                  "days"
                                )}{" "}
                                days ago
                              </time>
                            </span>
                          </div>
                        </li>
                        <li>
                          <Minus />
                          <div>
                            <strong>Expiration date:</strong>
                            <span>April 15, 2023</span>
                          </div>
                        </li>
                        <li>
                          <SearchIcon />
                          <div>
                            <strong>Location:</strong>
                            <span className="location">
                              <a
                                className="google_map_link"
                                href="http://maps.google.com/maps?q=Paris%2C+France&zoom=14&size=512x512&maptype=roadmap&sensor=false"
                              >
                                {job.location}
                              </a>
                            </span>
                          </div>
                        </li>
                        <li>
                          <CustomerIcon />
                          <div>
                            <strong>Job Title:</strong>
                            <span>{job.title}</span>
                          </div>
                        </li>
                        <li>
                          <RefundIcon />
                          <div>
                            <strong>Salary:</strong>
                            <span>
                              {CURRENCY}
                              {job.salary}
                            </span>
                          </div>
                        </li>
                      </ul>
                      <div className="job_application application">
                        <div className="small-dialog zoom-anim-dialog mfp-hide apply-popup">
                          <div className="small-dialog-headline">
                            <h2>Apply For This Job</h2>
                          </div>
                          <div className="small-dialog-content">
                            <hr />
                            {job.creator === profile.id ? (
                              <Button
                                onClick={() =>
                                  toggleManage(
                                    categorySelector(job.job_type),
                                    job.id
                                  )
                                }
                                size="small"
                                title={`Manage Job`}
                                disabled={!profile.is_verified}
                                style={{
                                  fontSize: 15,
                                  color: "#5918e6",
                                  backgroundColor: "#e6c018",
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
                                                    `Confrim email to Apply`
                                                  )
                                            }
                                            size="small"
                                            title={`Applied ✔`}
                                            disabled={true}
                                            style={{
                                              fontSize: 15,
                                              color: "#5918e6",
                                              backgroundColor: "#f2f2f2",

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
                                                    `Confrim email to Apply`
                                                  )
                                            }
                                            size="small"
                                            title={`Apply`}
                                            // disabled={!profile.is_verified}
                                            style={{
                                              fontSize: 15,
                                              color: "#5918e6",
                                              backgroundColor: profile.is_verified
                                                ? "#e6c018"
                                                : "#f2f2f2",

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
                                                `Confrim email to Apply `
                                              )
                                        }
                                        size="small"
                                        title={`Apply`}
                                        // disabled={!profile.is_verified}
                                        style={{
                                          fontSize: 15,
                                          color: "#5918e6",
                                          backgroundColor: profile.is_verified
                                            ? "#e6c018"
                                            : "#f2f2f2",

                                          height: "29px",
                                          margin: "0 0 0 10px",
                                        }}
                                      />
                                    )}
                                  </>
                                ) : null}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </RightCol>
                {/* Widgets / End */}
              </div>

              <Header>
                <ContainerView>
                  <Row>
                    <Col8>
                      <Experience>
                        <h5 className="accent">Contact Information</h5>
                        <br />
                        <h3 className="accent">
                          {org ? org.name : account.full_name}
                        </h3>
                        {org ? (
                          <>
                            <h2>{org.address}</h2>
                            <h2>{org.country}</h2>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: org.description,
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <h2>{user.location}</h2>
                            <h2>{account.email}</h2>
                            <p>{user.about}</p>
                          </>
                        )}
                      </Experience>
                    </Col8>
                  </Row>
                </ContainerView>
              </Header>
            </>
          )}
          {job === null && org === null && (
            <Center>
              <div>Job Listing Not Found</div>
              <p>{message}</p>
            </Center>
          )}
        </>
      )}
    </CardWrapper>
  );
};

export default SingleView;
