import React, { useEffect, useState, useContext } from "react";
import { CardWrapper } from "./Jobs.style";
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

function JobView() {
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

  return (
    <CardWrapper>
      <h4>
        Jobs Listing{" "}
        {profile.is_individual ? null : (
          <Button
            onClick={togglePost}
            size="small"
            title="Post a Job"
            disabled={true}
            style={{
              fontSize: 15,
              color: "#5918e6",
              backgroundColor: "#e6c018",
              float: "right",
            }}
          />
        )}
      </h4>

      <LeftContent>
        {jobs !== null && jobs.length > 0 ? (
          <ul>
            {jobs
              .filter(
                (filteredJob) =>
                  filteredJob.job_type !== "gig" &&
                  filteredJob.job_type !== "internship"
              )
              .map((job, index) => (
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
              ))}
          </ul>
        ) : (
          <div>Sorry No Jobs posted recently</div>
        )}
      </LeftContent>
    </CardWrapper>
  );
}

export default JobView;
