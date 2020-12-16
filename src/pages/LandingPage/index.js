import React, { useEffect, useState, useContext } from "react";
import { SEO } from "components/seo";

import Banner from "containers/Banner/Banner";
import AdsSection from "components/AdsSection/AdsSection";
import AdsSectionA from "components/AdsSection/AdsSectionA";
import BannerImg from "image/landing.jpg";
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
  H3,
  H4,
  Br,
} from "styles/pages.style";
import Button from "components/Button/Button";
import { useHistory, Link } from "react-router-dom";
import { LeftContent } from "styles/pages.style";
import ImageWrapper from "components/Image/Image";
import { CURRENCY } from "constants/constants";
import { RefundIcon, SearchIcon } from "components/AllSvgIcon";
import FooterContainer from "containers/Footer/Footer";
// import CustomCarousel from "components/Carousel/Carousel";
import { ArrowNext } from "components/AllSvgIcon";
import { comments as userComments } from "./comments";
import { articles as topArticles } from "./articles";
import { BASE_URL } from "constants/constants";
import axios from "axios";
import Error500 from "components/Error/Error500";
import Loader from "components/Loader/Loader";
import { AuthContext } from "contexts/auth/auth.context";
import { handleModal } from "pages/common/helpers";
import AuthenticationForm from "containers/SignInOutForm/Form";
import { openModal } from "@redq/reuse-modal";

function LandingPage({ deviceType }) {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext(AuthContext);
  const history = useHistory();
  const comments = userComments;
  const articles = topArticles;
  const [jobs, setJobs] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    // function deleteCookies() {
    //   var allCookies = document.cookie.split(";");

    //   // The "expire" attribute of every cookie is
    //   // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    //   for (var i = 0; i < allCookies.length; i++)
    //     document.cookie =
    //       allCookies[i] + "=;expires=" + new Date(0).toUTCString();
    // }
    localStorage.removeItem("access_token");
    localStorage.removeItem("thedb_auth_profile");
    localStorage.removeItem("thedb_auth_payload");
    localStorage.removeItem("thedb_auth_roles");
    localStorage.removeItem("thedb_applications");
    localStorage.removeItem("thedb_org_profile");
    localStorage.removeItem("thedb_individual_profile");
    authDispatch({ type: "SIGN_OUT" });

    try {
      axios
        .get(`${BASE_URL}/jobs/`)
        .then((res) => {
          setJobs(res.data.results);

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Catching Errors:", err);
          setError(err);
        });
    } catch (error) {
      setError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
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
        <Container>
          <RowWrapper>
            <JobsLeftCol>
              <H3>Recent Jobs</H3>
              <LeftContent>
                {error ? (
                  <Error500 err={error} />
                ) : (
                    <>
                      {loading ? (
                        <Loader />
                      ) : (
                          <>
                            {jobs ? (
                              <ul>
                                {jobs
                                  .sort((a, b) =>
                                    a.posted_on < b.posted_on
                                      ? 1
                                      : b.posted_on < a.posted_on
                                        ? -1
                                        : 0
                                  )
                                  .slice(0, 4)
                                  .map((job, index) => (
                                    <li key={index} className={`${job.job_type}`}>
                                      <a
                                        onClick={
                                          isAuthenticated ? null : toggleSignInForm
                                        }
                                        href={
                                          isAuthenticated
                                            ? `/dashboard/view/${job.id}`
                                            : null
                                        }
                                      >
                                        <ListingLogo>
                                          <ImageWrapper
                                            // url={job.company_logo}
                                            alt={"company logo"}
                                            id={job.creator}
                                          />
                                        </ListingLogo>
                                        <ListingTitle>
                                          <H4>
                                            {job.title}
                                            <TypeList>
                                              <ListSpan
                                                className={`${job.job_type}`}
                                              >
                                                {job.job_type}
                                              </ListSpan>
                                            </TypeList>
                                          </H4>
                                          <ListingIcons>
                                            <li>
                                              <div
                                                style={{
                                                  height: "20px",
                                                  width: "100%",
                                                  textOverflow: "ellipsis",
                                                  whiteSpace: "nowrap",
                                                  overflow: "hidden",
                                                }}
                                                className={`description`}
                                                dangerouslySetInnerHTML={{
                                                  __html: job.description,
                                                }}
                                              />
                                            </li>
                                            <li>
                                              <SearchIcon />
                                              {job.location}
                                            </li>
                                            <li>
                                              <RefundIcon />
                                              {CURRENCY}

                                              {job.salary}
                                            </li>
                                          </ListingIcons>
                                        </ListingTitle>
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            ) : null}
                          </>
                        )}
                    </>
                  )}
              </LeftContent>
              <Center>
                {isAuthenticated ? (
                  <Button
                    onClick={() => history.push("/dashboard")}
                    size="small"
                    title="Show More Jobs"
                    style={{ fontSize: 15, color: "#e6c018" }}
                  />
                ) : (
                    <Button
                      onClick={() =>
                        handleModal(
                          "Log in to view More jobs",
                          null,
                          <Button
                            onClick={toggleSignInForm}
                            size="small"
                            title="Login"
                            style={{ fontSize: 15, color: "#e6c018" }}
                          />
                        )
                      }
                      size="small"
                      title="Show More ..."
                      style={{
                        fontSize: 15,
                        color: "#e6c018",
                        backgroundColor: "#f2f2f2",
                      }}
                    />
                  )}
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
                      {jobs.slice(0, 1).map((job, index) => (
                        <SpotlightCard key={index}>
                          <Link
                            onClick={isAuthenticated ? null : toggleSignInForm}
                            to={
                              isAuthenticated ? `/dashboard/view/${job.id}` : ""
                            }
                          >
                            <H4>{job.title}</H4>
                            <br />
                            <TypeList
                              style={{
                                position: `inherit`,
                                top: `0`,
                                maxWidth: `100%`,
                              }}
                            >
                              <ListSpan className={`${job.job_type}`}>
                                {job.job_type}
                              </ListSpan>
                            </TypeList>
                          </Link>
                          <SpotlightName>{job.name}</SpotlightName>
                          <br />
                          <SpotlightLocation>
                            {" "}
                            <SearchIcon />
                            {job.location}
                          </SpotlightLocation>
                          <br />
                          <SpotlightRate>
                            <RefundIcon />
                            {job.industry}
                          </SpotlightRate>
                          <br />
                          <SpotlightSalary>
                            {CURRENCY}

                            {job.salary}
                          </SpotlightSalary>

                          <div
                            style={{
                              display: "block",
                              height: "100px",
                              width: "100%",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: job.description,
                            }}
                          />
                          <Center>
                            {isAuthenticated ? (
                              <Button
                                onClick={() =>
                                  history.push(`/dashboard/view/${job.id}`)
                                }
                                size="small"
                                title={`Apply`}
                                style={{ fontSize: 15, color: "#e6c018" }}
                              />
                            ) : (
                                <Button
                                  onClick={() =>
                                    handleModal(
                                      "Log in to view More jobs",
                                      null,
                                      <Button
                                        onClick={toggleSignInForm}
                                        size="small"
                                        title="Login"
                                        style={{ fontSize: 15, color: "#e6c018" }}
                                      />
                                    )
                                  }
                                  size="small"
                                  title="Apply"
                                  style={{
                                    fontSize: 15,
                                    color: "#e6c018",
                                    backgroundColor: "#f2f2f2",
                                  }}
                                />
                              )}
                          </Center>
                        </SpotlightCard>
                      ))}
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
                      <Link
                        to={isAuthenticated ? `/dashboard/${article.slug}` : ""}
                        onClick={
                          isAuthenticated
                            ? () => history.push(`/dashboard/${article.slug}`)
                            : toggleSignInForm
                        }
                      >
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
                      onClick={
                        isAuthenticated
                          ? () => history.push(`/dashboard/${article.slug}`)
                          : toggleSignInForm
                      }
                      size="small"
                      title={
                        isAuthenticated ? `View ${article.slug}` : "Get Started"
                      }
                      style={{ fontSize: 15, color: "#e6c018" }}
                    />
                  </Article>
                ))}
              </ArticleWrapper>
            ) : null}
          </RowWrapper>
        </Container>

        {/* AD BANNER SECTION. */}


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
                  Why?
                  <span>
                    Here is what motivates us at TheDatabase and we share it in the hope
                    that it will help you make the most out of your life.
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
