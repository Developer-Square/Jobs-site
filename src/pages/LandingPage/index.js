import React from "react";
import { SEO } from "components/seo";

import Banner from "containers/Banner/Banner";
import AdsSection from "components/AdsSection/AdsSection";
import AdsSectionA from "components/AdsSection/AdsSectionA";
import BannerImg from "image/LANDING.jpg";
import {
  Container,
  RowWrapper,
  // RowContent,
  // ReviewContent,
  MainContentArea,
  JobsLeftCol,
  JobsRightCol,
  ListingLogo,
  ListingTitle,
  ListingIcons,
  ListSpan,
  Center,
  // JobsRow,
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
  // BannerSection,
  UserComments,
  Comments,
  Comment,
  ArticleWrapper,
  Article,
  ArticleSection,
  Figure,
  P,
  H3,
  H4,
  Br,
} from "styles/pages.style";
import Button from "components/Button/Button";
import { useHistory, Link } from "react-router-dom";
import { LeftContent } from "styles/pages.style";
import ImageWrapper from "components/Image/Image";
import { CURRENCY } from "constants/constants";
import { GiftBox, LockIcon, SearchIcon } from "components/AllSvgIcon";
import FooterContainer from "containers/Footer/Footer";
// import CustomCarousel from "components/Carousel/Carousel";
import { ArrowNext } from "components/AllSvgIcon";
import { spotlightJobs as spotlight } from "./spotlightJobs";
import { comments as userComments } from "./comments";
import { jobs as availableJobs } from "./jobs";
import { articles as topArticles } from "./articles";

function LandingPage({ deviceType }) {
  const history = useHistory;
  const spotlightJobs = spotlight;
  const comments = userComments;
  const jobs = availableJobs;
  const articles = topArticles;

  const spotlightContent = spotlightJobs.map((job, index) => (
    <SpotlightCard key={index}>
      <Link to="/jobs">
        <H4>{job.post}</H4>
        <br />
        {job.categories.length > 1 ? (
          <TypeList
            style={{
              position: `inherit`,
              top: `0`,
              maxWidth: `100%`,
            }}
          >
            {job.categories.map((category, index) => (
              <ListSpan key={index} className={category.slug}>
                {category.title}
              </ListSpan>
            ))}
          </TypeList>
        ) : (
          <TypeList>
            <ListSpan className={`${job.categories[0].slug}`}>
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
  ));
  const userComment = comments.map((comment, index) => (
    <Comment key={index}>
      <TestimonialBox>
        <Testimonial>
          <p>{comment.comment}</p>
        </Testimonial>
      </TestimonialBox>
      <TestimonialAuthor>
        <ImageWrapper url={comment.imageUrl} alt={"company logo"} />
        <h4>
          {comment.name}
          <span>{comment.position}</span>
        </h4>
      </TestimonialAuthor>
    </Comment>
  ));

  return (
    <>
      <SEO
        title="The Database - Jobs Need People"
        description="jobs gigs resume job-search Details"
      />
      <Banner imageUrl={BannerImg} />
      <MainContentArea>
        {/* AD BANNER SECTION. */}
        <Container>
          <RowWrapper>
            <AdsSectionA />
          </RowWrapper>
        </Container>

        <Br />
        <Container>
          <RowWrapper>
            {articles ? (
              <ArticleWrapper>
                {articles.map((article, index) => (
                  <Article key={index}>
                    <Figure>
                      <Link to={article.slug}>
                        <ImageWrapper
                          url={article.imgUrl}
                          alt={`article image`}
                          style={{
                            height: "400px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </Link>
                      <ArrowNext />
                    </Figure>
                    <ArticleSection>
                      <Link to={article.slug}>{article.title}</Link>
                      <p>{article.content}</p>
                    </ArticleSection>
                    <Button
                      onClick={() => history.push(`/blog/${article.slug}`)}
                      size="small"
                      title="Get Started"
                      style={{ fontSize: 15, color: "#e6c018" }}
                    />
                  </Article>
                ))}
              </ArticleWrapper>
            ) : null}
          </RowWrapper>
        </Container>

        {/* AD BANNER SECTION. */}

        <Container>
          <RowWrapper>
            <JobsLeftCol>
              <H3>Recent Jobs</H3>
              <LeftContent>
                {jobs ? (
                  <ul>
                    {jobs.map((job, index) => (
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
                              {job.post}
                              {job.categories.length > 1 ? (
                                <TypeList>
                                  {job.categories.map((category, index) => (
                                    <ListSpan
                                      key={index}
                                      className={category.slug}
                                    >
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
            </JobsLeftCol>
            <JobsRightCol>
              <RightWrapper>
                <H3>Job SpotLight</H3>
                <JobSpotlight>
                  {jobs ? (
                    <div>
                      {/* <CustomCarousel
                        deviceType={deviceType}
                        content={spotlightContent}
                        perView={1}
                      /> */}
                      {spotlightContent}
                    </div>
                  ) : null}
                  <div>
                    <SpotlightCard>
                      <AdsSection />
                    </SpotlightCard>
                  </div>
                </JobSpotlight>
              </RightWrapper>
            </JobsRightCol>
            <Br />
          </RowWrapper>
        </Container>
        {/* <Container>
          <RowContent>
            {contents.map((content, index) => (
              <Card
                key={index}
                title={content.title}
                description={content.description}
              />
            ))}
          </RowContent>
        </Container> */}

        {/* AD BANNER SECTION */}
        <Container>
          <UserComments>
            <div>
              <div>
                <h3>
                  Meet The Team
                  <span>
                    TheDatabase is a family of nine young men and women. All are
                    youths and passionate about effecting change in the society.
                    Below are the leaders.
                  </span>
                </h3>
                <Comments>
                  {/* <CustomCarousel
                    deviceType={deviceType}
                    content={userComment}
                    perView={1}
                    itemClass={{ display: "flex" }}
                  /> */}
                  {userComment}
                </Comments>
              </div>
            </div>
            <Br />
          </UserComments>
        </Container>
        {/* <Container>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              fontSize: "28px",
            }}
          >
            Meet the Team
          </h3>
          <ReviewContent>
            {reviews.map((review, index) => (
              <Team key={index} title={review.title} review={review.review} />
            ))}
          </ReviewContent>
        </Container>
       */}
      </MainContentArea>
      <FooterContainer />
    </>
  );
}
export default LandingPage;
