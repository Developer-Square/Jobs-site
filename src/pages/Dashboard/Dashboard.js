import React, { useEffect, useState } from "react";
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
import { Center } from "styles/pages.style";
import Button from "components/Button/Button";

function Dashboard() {
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

  return (
    <CardWrapper>
      <h4>Dashboard</h4>

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
                    <H4>
                      {job.title}

                      <TypeList>
                        <ListSpan className={`${job.type}`}>
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
                </section>
                <section>
                  <Center>
                    <Button
                      onClick={handleApplication}
                      size="small"
                      title={`Apply for ${job.job_type}`}
                      style={{
                        fontSize: 15,
                        color: "#5918e6",
                        backgroundColor: "#e6c018",
                        float: "right",
                      }}
                    />
                  </Center>
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
