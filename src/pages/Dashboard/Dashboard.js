/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { openModal } from "@redq/reuse-modal";
import { CardWrapper } from "./Dashboard.style";
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
import { useStickyDispatch } from "contexts/app/app.provider";
import { GiftBox, SearchIcon, LockIcon } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import ApplicationModal from "../common/ApplicationModal";
import Loader from "components/Loader/Loader";
import Error500 from "components/Error/Error500";
import { categorySelector } from "pages/common/helpers";

function Dashboard() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const history = useHistory();
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log("profile", profile);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      try {
        axios
          .get(`${BASE_URL}/jobs/`, tokenConfig())
          .then((res) => {
            console.log("industry data", res.data.results);
            setJobs(res.data.results);
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
  }, []);

  const useDispatch = useStickyDispatch();
  const setForm = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const toggleManage = (category, id) => {
    setForm();
    history.push(`/dashboard/${category}/${id}`);
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
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <CardWrapper>
      <H4>
        Dashboard
        {profile.dummy_verified ? null : (
          <span>Verify Email to apply for the Openings</span>
        )}
      </H4>
      {loading ? (
        <Loader />
      ) : (
        <LeftContent>
          <>
            {jobs !== null && jobs.length > 0 ? (
              <ul>
                {jobs.map((job, index) => (
                  <li key={index}>
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
                                title={`Manage Job`}
                                // disabled={!profile.dummy_verified}
                                style={{
                                  fontSize: 15,
                                  color: "#5918e6",
                                  backgroundColor: "#e6c018",
                                  // float: "left",
                                  height: "29px",
                                  margin: "0 10px",
                                }}
                              />
                            ) : (
                              <>
                                {localStorage.getItem("thedb_applications") ? (
                                  <>
                                    {localStorage
                                      .getItem("thedb_applications")
                                      .includes(job.id) ? (
                                      <Button
                                        onClick={() =>
                                          profile.dummy_verified
                                            ? handleApplication(job.id)
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
                                            ? handleApplication(job.id)
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
                                ) : (
                                  <Button
                                    onClick={() =>
                                      profile.dummy_verified
                                        ? handleApplication(job.id)
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
                            {job.description}
                          </li>
                          <li>
                            <SearchIcon />
                            {job.location}
                          </li>
                          <li>
                            <LockIcon />
                            {CURRENCY}
                            {job.salary} - {CURRENCY}
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
      )}
    </CardWrapper>
  );
}

export default Dashboard;
