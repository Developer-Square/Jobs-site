/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import {
  InkPen,
  Members,
  SiteSettings,
} from "components/AllSvgIcon";
import Error500 from "components/Error/Error500";
import Loader from "components/Loader/Loader";
import { BASE_URL } from "constants/constants";
import { useAppState } from "contexts/app/app.provider";
import { AuthContext } from "contexts/auth/auth.context";
import {
  addObjectToLocalStorageObject,
  addToLocalStorageArray,
  tokenConfig,
} from "helpers";
import _ from "lodash";
import { getApplications } from "pages/common/helpers";
import React, { useContext, useEffect, useState } from "react";
import {
  BoxContent,
  BoxCounter,
  BoxIcon,
  CategoriesContainer,
  CategoryBox,
  H4,
  MainContentArea,
} from "styles/pages.style";
import { CardWrapper } from "./Dashboard.style";

function Dashboard() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
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

  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <CardWrapper>
      <H4>Hello, {profile.full_name}</H4>
      <h5>Explore TheDatabase</h5>
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
                      <BoxContent>My Applications</BoxContent>
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
          </>
        )}
    </CardWrapper>
  );
}

export default Dashboard;
