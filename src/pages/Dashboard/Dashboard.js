import React, { useEffect, useState, useContext } from "react";
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
import { GiftBox, SearchIcon, LockIcon } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";

function Dashboard() {
  const {
    authState: { profile },
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
      <H4>
        Dashboard
        {profile.is_verified ? null : (
          <span>Kindly verify Email to apply for the Openings</span>
        )}
      </H4>

      <LeftContent>
        {jobs !== null && jobs.length > 0 ? (
          <ul>
            {jobs.map((job, index) => (
              <li key={index}>
                <section>
                  <ListingLogo>
                    <ImageWrapper url={job.companyLogo} alt={"company logo"} />
                  </ListingLogo>
                  <ListingTitle>
                    <h3>
                      {job.title}
                      <TypeList>
                        <ListSpan className={`${job.job_type}`}>
                          {job.job_type}
                        </ListSpan>
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
      </LeftContent>
    </CardWrapper>
  );
}

export default Dashboard;
