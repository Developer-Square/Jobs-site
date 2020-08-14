/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext, useCallback } from "react";
import { CardWrapper } from "../common/style";
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
import { GiftBox, SearchIcon, LockIcon } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import ApplicationModal from "pages/common/ApplicationModal";
import Loader from "components/Loader/Loader";
import { useStickyDispatch } from "contexts/app/app.provider";
import Error500 from "components/Error/Error500";
import { useHistory } from "react-router-dom";
import { categorySelector } from "pages/common/helpers";

function GigView() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [applications, setApplications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/jobs/applicants/`, tokenConfig())
        .then((res) => {
          console.log("industry data", res.data.results);
          const applications = res.data.results.filter(
            (filteredApplication) => filteredApplication.id === profile.id
          );
          setApplications(applications);
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
  // eslint-disable-next-line no-unused-vars
  const togglePost = () => {
    setPost();
  };
  const handleApplication = (jobId) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => ApplicationModal(jobId),
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
      <H4>Applications</H4>
      <H4>
        <Button
          onClick={() => history.push(`/dashboard/jobs`)}
          size="small"
          title={`Jobs`}
          style={{
            fontSize: 15,
            color: "#fff",
            backgroundColor: "#c018e6",
            margin: "0 10px",
          }}
        />
        <Button
          onClick={() => history.push(`/dashboard/internships`)}
          size="small"
          title={`Internships`}
          style={{
            fontSize: 15,
            color: "#fff",
            backgroundColor: "#e618a5",
            margin: "0 10px",
          }}
        />

        <Button
          onClick={() => history.push(`/dashboard/gigs`)}
          size="small"
          title={`Gigs`}
          style={{
            fontSize: 15,
            color: "#fff",
            backgroundColor: "#e65918",
            margin: "0 10px",
          }}
        />
      </H4>
      {loading ? (
        <Loader />
      ) : (
        <LeftContent>
          {applications !== null && applications.length > 0 ? (
            <ul>
              {applications.map((app, index) => (
                <>
                  {app !== null && app !== undefined ? (
                    <li key={index}>
                      <section>
                        <ListingLogo>
                          <ImageWrapper
                            url={setApplications.companyLogo}
                            alt={"company logo"}
                          />
                        </ListingLogo>
                        <ListingTitle>
                          <h3>
                            {app.title}

                            <TypeList>
                              <ListSpan className={`${app.job_type}`}>
                                {app.job_type}
                              </ListSpan>
                              {app.creator === profile.id ? (
                                <Button
                                  onClick={() =>
                                    toggleManage(
                                      categorySelector(app.job_type),
                                      app.id
                                    )
                                  }
                                  size="small"
                                  title={`Manage Gig`}
                                  disabled={!profile.dummy_verified}
                                  style={{
                                    fontSize: 15,
                                    color: "#5918e6",
                                    backgroundColor: "#e6c018",
                                    float: "right",
                                    height: "29px",
                                    margin: "0 0 0 10px",
                                  }}
                                />
                              ) : (
                                <>
                                  {localStorage
                                    .getItem("thedb_applications")
                                    .includes(app.id) ? (
                                    <Button
                                      onClick={() =>
                                        profile.dummy_verified
                                          ? handleApplication(app.id)
                                          : handleModal()
                                      }
                                      size="small"
                                      title={`Applied ✔`}
                                      disabled={true}
                                      style={{
                                        fontSize: 15,
                                        color: "#5918e6",
                                        backgroundColor: "#f2f2f2",
                                        float: "right",
                                        height: "29px",
                                        margin: "0 0 0 10px",
                                      }}
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        profile.dummy_verified
                                          ? handleApplication(app.id)
                                          : handleModal()
                                      }
                                      size="small"
                                      title={`Apply`}
                                      // disabled={!profile.dummy_verified}
                                      style={{
                                        fontSize: 15,
                                        color: "#5918e6",
                                        backgroundColor: profile.dummy_verified
                                          ? "#e6c018"
                                          : "#f2f2f2",
                                        float: "right",
                                        height: "29px",
                                        margin: "0 0 0 10px",
                                      }}
                                    />
                                  )}
                                </>
                              )}
                            </TypeList>
                          </h3>
                          <ListingIcons>
                            <li>
                              <GiftBox />
                              {app.description}
                            </li>
                            <li>
                              <SearchIcon />
                              {app.location}
                            </li>
                            <li>
                              <LockIcon />
                              {CURRENCY}
                              {app.salary} - {CURRENCY}
                              {app.salary}
                            </li>
                          </ListingIcons>
                        </ListingTitle>
                      </section>
                    </li>
                  ) : (
                    <>
                      <h4>
                        View recent posts
                        <Button
                          onClick={() => history.push(`/dashboard/jobs`)}
                          size="small"
                          title={`Jobs`}
                          style={{
                            fontSize: 15,
                            color: "#fff",
                            backgroundColor: "#c018e6",
                            float: "left",
                          }}
                        />
                        <Button
                          onClick={() => history.push(`/dashboard/internships`)}
                          size="small"
                          title={`Internships`}
                          style={{
                            fontSize: 15,
                            color: "#fff",
                            backgroundColor: "#e61835",
                            float: "right",
                          }}
                        />
                        <Button
                          onClick={() => history.push(`/dashboard/gigs`)}
                          size="small"
                          title={`Gigs`}
                          style={{
                            fontSize: 15,
                            color: "#fff",
                            backgroundColor: "#e65918",
                            float: "right",
                          }}
                        />
                      </h4>
                      <div>Sorry, No applications made yet</div>
                    </>
                  )}
                </>
              ))}
            </ul>
          ) : (
            <div>Sorry, No applications made yet</div>
          )}
        </LeftContent>
      )}
    </CardWrapper>
  );
}

export default GigView;
