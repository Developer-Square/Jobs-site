import React from "react";
import { SEO } from "components/seo";

import Banner from "containers/Banner/Banner";
import BannerImg from "image/hands.jpg";
import {
  Container,
  RowWrapper,
  CategoriesContainer,
  CategoryBox,
  BoxCounter,
  BoxContent,
  JobsLeftCol,
  JobsRightCol,
  ListingLogo,
  ListingTitle,
  ListingIcons,
  BoxIcon,
  Center,
  JobsRow,
  H3,
  H4,
  Br,
} from "styles/pages.style";
import { JOBS } from "constants/routes.constants";
import { EllipsisIcon } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import { useHistory } from "react-router-dom";
import { LeftContent } from "styles/pages.style";
import ImageWrapper from "components/Image/Image";

function LandingPage({ deviceType }) {
  const history = useHistory;
  const categories = [
    {
      id: 1,
      counter: 6,
      name: "Telecommunications",
      slug: "telecommunications",
    },
    {
      id: 2,
      counter: 1,
      name: "Accounting/Finance",
      slug: "accounting-finance",
    },
    {
      id: 3,
      counter: 2,
      name: "Automotive Jobs",
      slug: "automotive",
    },
    {
      id: 4,
      counter: 9,
      name: "Healthcare",
      slug: "healthcare",
    },
    {
      id: 5,
      counter: 6,
      name: "Education Facilities",
      slug: "educatin-facilities",
    },
    {
      id: 6,
      counter: 26,
      name: "All Gigs",
      slug: "gigs",
    },
    {
      id: 7,
      counter: 64,
      name: "All Jobs",
      slug: "jobs",
    },
  ];
  const data = categories;
  const jobs = [
    {
      id: 1,
      name: "The database",
      post: "Manager",
      priceRange: 40000,
      Location: "kenya, Nairobi",
      companyLogo:
        "https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/company-logo.png",
      categories: [
        {
          id: 1,
          category: "internship",
        },
        {
          id: 2,
          category: "temporary",
        },
        {
          id: 3,
          category: "full time",
        },
      ],
    },
  ];
  return (
    <>
      <SEO
        title="The Database - Jobs Need People"
        description="jobs gigs resume job-search Details"
      />
      <Banner imageUrl={BannerImg} />
      <Container>
        <RowWrapper>
          {data ? (
            <>
              <H3>Popular Categories</H3>
              <CategoriesContainer>
                {data.map((category, index) => (
                  <CategoryBox to={`${JOBS}`} key={index}>
                    <BoxIcon>
                      <EllipsisIcon />
                    </BoxIcon>
                    <BoxCounter>{category.counter}</BoxCounter>
                    <BoxContent>{category.name}</BoxContent>
                  </CategoryBox>
                ))}
              </CategoriesContainer>
              <Center>
                <Button
                  onClick={() => history.push("/jobs")}
                  size="small"
                  title="Browse All Categories"
                  style={{ fontSize: 15, color: "#e6c018" }}
                />
              </Center>
            </>
          ) : null}
          <Br />
        </RowWrapper>
        <JobsRow>
          <JobsLeftCol>
            <div>
              <H3>Recent Jobs</H3>
              <LeftContent>
                {jobs ? (
                  <ul>
                    {jobs.map((job) => (
                      <li>
                        <a href="jobs">
                          <ListingLogo>
                            <ImageWrapper
                              url={job.companyLogo}
                              alt={"company logo"}
                            />
                          </ListingLogo>
                          <ListingTitle>
                            <H4>{job.post}</H4>
                            <ListingIcons></ListingIcons>
                          </ListingTitle>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </LeftContent>
            </div>
          </JobsLeftCol>
          <JobsRightCol>
            <div></div>
          </JobsRightCol>
        </JobsRow>
      </Container>
    </>
  );
}
export default LandingPage;
