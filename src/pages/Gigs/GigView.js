import React, { useEffect, useState, useContext } from "react";
import { CardWrapper } from "./Gigs.style";
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

function GigView() {
  const {
    authState: { profile },
    authDispatch,
  } = useContext(AuthContext);
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/jobs/`, tokenConfig())
      .then((res) => {
        console.log("industry data", res.data.results);
        setJobs(res.data.results);
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  }, []);

  const togglePost = () => {
    authDispatch({
      type: "POST",
    });
  };
  const toggleManage = () => {
    authDispatch({
      type: "MANAGE",
    });
  };
  const handleApplication = () => {
    console.log("will apply soon");
  };
  const handleModal = () => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: EmailVerificationModal,
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

  return (
    <CardWrapper>
      <h4>
        Gigs Listing{" "}
        <Button
          onClick={profile.is_verified ? togglePost : handleModal}
          size="small"
          title="Post a Gig"
          disabled={profile.is_verified ? true : false}
          style={{
            fontSize: 15,
            color: "#5918e6",
            backgroundColor: profile.is_verified ? "#e6c018" : "#f2f2f2",
            float: "right",
          }}
        />
      </h4>

      <LeftContent>
        {jobs !== null && jobs.length > 0 ? (
          <ul>
            {jobs
              .filter((filteredJob) => filteredJob.job_type === "gig")
              .map((job, index) => (
                <>
                  {job !== null && job !== undefined ? (
                    <li key={index}>
                      <a href="jobs">
                        <ListingLogo>
                          <ImageWrapper
                            url={job.companyLogo}
                            alt={"company logo"}
                          />
                        </ListingLogo>
                        <ListingTitle>
                          <H4>
                            {job.title}

                            <TypeList>
                              <ListSpan className={`${job.job_type}`}>
                                {job.job_type}
                              </ListSpan>
                              {job.creator === profile.id ? (
                                <Button
                                  onClick={toggleManage}
                                  size="small"
                                  title={`Manage Job`}
                                  disabled={profile.is_verified ? true : false}
                                  style={{
                                    fontSize: 15,
                                    color: "#5918e6",
                                    backgroundColor: "#e6c018",
                                    float: "left",
                                    height: "29px",
                                    margin: "0 10px",
                                  }}
                                />
                              ) : (
                                <Button
                                  onClick={
                                    profile.is_verified
                                      ? handleApplication
                                      : handleModal
                                  }
                                  size="small"
                                  title={`Apply`}
                                  disabled={profile.is_verified ? true : false}
                                  style={{
                                    fontSize: 15,
                                    color: "#5918e6",
                                    backgroundColor: profile.is_verified
                                      ? "#e6c018"
                                      : "#f2f2f2",
                                    float: "left",
                                    height: "29px",
                                    margin: "0 10px",
                                  }}
                                />
                              )}
                            </TypeList>
                          </H4>
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
                      </a>
                    </li>
                  ) : (
                    <div>Sorry, No Gigs posted recently</div>
                  )}
                </>
              ))}
          </ul>
        ) : (
          <div>Sorry No Gigs posted recently</div>
        )}
      </LeftContent>
    </CardWrapper>
  );
}

export default GigView;
