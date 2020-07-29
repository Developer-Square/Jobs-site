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
  ListSpan,
  BoxIcon,
  Center,
  JobsRow,
  TypeList,
  RightWrapper,
  JobSpotlight,
  SpotlightCard,
  SpotlightName,
  SpotlightLocation,
  SpotlightRate,
  SpotlightSalary,
  TestimonialAuthor,
  TestimonialBox,
  Testimonial,
  UserComments,
  Comments,
  Comment,
  P,
  H3,
  H4,
  Br,
} from "styles/pages.style";
import { JOBS } from "constants/routes.constants";
import { EllipsisIcon } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import { useHistory, Link } from "react-router-dom";
import { LeftContent } from "styles/pages.style";
import ImageWrapper from "components/Image/Image";
import { CURRENCY } from "constants/constants";
import { GiftBox, LockIcon, SearchIcon } from "components/AllSvgIcon";
import Footer from "containers/Footer/Footer";
// import CustomCarousel from "components/Carousel/Carousel";

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
      name: "The Database",
      post: "Manager",
      maxPrice: 40000,
      minPrice: 50000,
      rateLow: 1000,
      rateHigh: 2000,
      location: "Nairobi, Kenya",
      description:
        "The Dishwasher is responsible for proper use, care, and maintenance of the dish machine. The   Dishwasher is also responsible for minor interior and exterior maintenance (snow & ice removal, trash…",
      companyLogo:
        "https://thedatabase.co.ke/static/assets/img/brand/dblogo.png",
      categories: [
        {
          id: 1,
          title: "Internship",
          slug: "internship",
        },
        {
          id: 2,
          title: "Temporary",
          slug: "temporary",
        },
        {
          id: 3,
          title: "Full Time",
          slug: "full-time",
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
                            <H4>
                              {job.post}
                              {job.categories.length > 1 ? (
                                <TypeList>
                                  {job.categories.map((category) => (
                                    <ListSpan className={category.slug}>
                                      {category.title}
                                    </ListSpan>
                                  ))}
                                </TypeList>
                              ) : (
                                <TypeList>
                                  <ListSpan
                                    className={`${job.categories[0].slug}`}
                                  >
                                    {job.categories[0].title}
                                  </ListSpan>
                                </TypeList>
                              )}
                            </H4>
                            <ListingIcons>
                              <li>
                                <GiftBox />
                                {job.name}
                              </li>
                              <li>
                                <SearchIcon />
                                {job.location}
                              </li>
                              <li>
                                <LockIcon />
                                {CURRENCY}
                                {job.maxPrice} - {CURRENCY}
                                {job.maxPrice}
                              </li>
                            </ListingIcons>
                          </ListingTitle>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </LeftContent>
              <Center>
                <Button
                  onClick={() => history.push("/jobs")}
                  size="small"
                  title="Show More Jobs"
                  style={{ fontSize: 15, color: "#e6c018" }}
                />
              </Center>
            </div>
          </JobsLeftCol>
          <JobsRightCol>
            <div>
              <RightWrapper>
                <H3>Job SpotLight</H3>
                <JobSpotlight>
                  {jobs ? (
                    <div>
                      {/* <CustomCarousel /> */}
                      {jobs.map((job) => (
                        <SpotlightCard>
                          <Link to="/jobs">
                            <H4>{job.post}</H4>
                            {job.categories.length > 1 ? (
                              <TypeList
                                style={{
                                  position: `inherit`,
                                  top: `0`,
                                  maxWidth: `100%`,
                                }}
                              >
                                {job.categories.map((category) => (
                                  <ListSpan className={category.slug}>
                                    {category.title}
                                  </ListSpan>
                                ))}
                              </TypeList>
                            ) : (
                              <TypeList>
                                <ListSpan
                                  className={`${job.categories[0].slug}`}
                                >
                                  {job.categories[0].title}
                                </ListSpan>
                              </TypeList>
                            )}
                          </Link>
                          <SpotlightName>
                            <GiftBox />
                            {job.name}
                          </SpotlightName>
                          <br />
                          <SpotlightLocation>
                            {" "}
                            <SearchIcon />
                            {job.location}
                          </SpotlightLocation>
                          <br />
                          <SpotlightRate>
                            <LockIcon />
                            {CURRENCY}
                            {job.rateLow} - {CURRENCY}
                            {job.rateHigh} / hour
                          </SpotlightRate>
                          <br />
                          <SpotlightSalary>
                            <LockIcon />
                            {CURRENCY}
                            {job.maxPrice} - {CURRENCY}
                            {job.maxPrice}
                          </SpotlightSalary>
                          <P>{job.description}</P>
                          <Center>
                            <Button
                              onClick={() => history.push("/jobs")}
                              size="small"
                              title="Apply For this job"
                              style={{ fontSize: 15, color: "#e6c018" }}
                            />
                          </Center>
                        </SpotlightCard>
                      ))}
                    </div>
                  ) : null}
                </JobSpotlight>
              </RightWrapper>
            </div>
          </JobsRightCol>
          <Br />
        </JobsRow>
        <UserComments>
          <div>
            <div>
              <h3>
                What Our Users Say
                <span>
                  We collect reviews from our users so you can get an honest
                  opinion of what an experience with our website are really
                  like!
                </span>
              </h3>
              <Comments>
                <Comment>
                  <TestimonialBox>
                    <Testimonial>
                      <p>
                        Nam eu eleifend nulla. Duis consectetur sit amet risus
                        sit amet venenatis. Pellentesque pulvinar ante a
                        tincidunt placerat. Donec dapibus efficitur arcu, a
                        rhoncus lectus egestas elementum.
                      </p>
                    </Testimonial>
                  </TestimonialBox>
                  <TestimonialAuthor>
                    <ImageWrapper
                      url={`https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/resumes-list-avatar-01.png`}
                      alt={"company logo"}
                    />
                    <h4>
                      Mr. or Mrs. Somebody
                      <span>HR Specialist</span>
                    </h4>
                  </TestimonialAuthor>
                </Comment>
                <Comment>
                  <TestimonialBox>
                    <Testimonial>
                      <p>
                        Nam eu eleifend nulla. Duis consectetur sit amet risus
                        sit amet venenatis. Pellentesque pulvinar ante a
                        tincidunt placerat. Donec dapibus efficitur arcu, a
                        rhoncus lectus egestas elementum.
                      </p>
                    </Testimonial>
                  </TestimonialBox>
                  <TestimonialAuthor>
                    <ImageWrapper
                      url={`https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/resumes-list-avatar-01.png`}
                      alt={"company logo"}
                    />
                    <h4>
                      Mr. or Mrs. Somebody
                      <span>HR Specialist</span>
                    </h4>
                  </TestimonialAuthor>
                </Comment>
                <Comment>
                  <TestimonialBox>
                    <Testimonial>
                      <p>
                        Nam eu eleifend nulla. Duis consectetur sit amet risus
                        sit amet venenatis. Pellentesque pulvinar ante a
                        tincidunt placerat. Donec dapibus efficitur arcu, a
                        rhoncus lectus egestas elementum.
                      </p>
                    </Testimonial>
                  </TestimonialBox>
                  <TestimonialAuthor>
                    <ImageWrapper
                      url={`https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/resumes-list-avatar-01.png`}
                      alt={"company logo"}
                    />
                    <h4>
                      Mr. or Mrs. Somebody
                      <span>HR Specialist</span>
                    </h4>
                  </TestimonialAuthor>
                </Comment>
              </Comments>
            </div>
          </div>
          <Br />
        </UserComments>
      </Container>
    </>
  );
}
export default LandingPage;
