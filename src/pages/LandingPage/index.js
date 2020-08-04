import React from "react";
import { SEO } from "components/seo";

import Banner from "containers/Banner/Banner";
import Card from "containers/Card/Card";
import Team from "containers/Team/Team";
import BannerImg from "image/hands.jpg";
import {
  Container,
  RowWrapper,
  RowContent,
  ReviewContent,
  CategoriesContainer,
  MainContentArea,
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
import { JOBS } from "constants/routes.constants";
import { EllipsisIcon } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import { useHistory, Link } from "react-router-dom";
import { LeftContent } from "styles/pages.style";
import ImageWrapper from "components/Image/Image";
import { CURRENCY } from "constants/constants";
import { GiftBox, LockIcon, SearchIcon } from "components/AllSvgIcon";
import FooterContainer from "../../containers/Footer/Footer";
import CustomCarousel from "components/Carousel/Carousel";
import { ArrowNext } from "components/AllSvgIcon";

function LandingPage({ deviceType }) {
  const history = useHistory;
  console.log(deviceType);
  // const categories = [
  //   {
  //     id: 1,
  //     counter: 6,
  //     name: "CV",
  //     slug: "cv",
  //     imageurl:
  //       "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 2,
  //     counter: 1,
  //     name: "Blog",
  //     slug: "blog",
  //   },
  //   {
  //     id: 3,
  //     counter: 2,
  //     name: "Automotive Jobs",
  //     slug: "automotive",
  //   },
  //   {
  //     id: 4,
  //     counter: 9,
  //     name: "Healthcare",
  //     slug: "healthcare",
  //   },
  //   {
  //     id: 5,
  //     counter: 6,
  //     name: "Education Facilities",
  //     slug: "educatin-facilities",
  //   },
  //   {
  //     id: 6,
  //     counter: 26,
  //     name: "All Gigs",
  //     slug: "gigs",
  //   },
  //   {
  //     id: 7,
  //     counter: 64,
  //     name: "All Jobs",
  //     slug: "jobs",
  //   },
  //   {
  //     id: 7,
  //     counter: 64,
  //     name: "All Jobs",
  //     slug: "jobs",
  //   },
  // ];
  // const data = categories;
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
        "The Manager is responsible for proper use, care, and maintenance of the dish machine. The   Dishwasher is also responsible for minor interior and exterior maintenance (snow & ice removal, trash…",
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
    // {
    //   id: 2,
    //   name: "The Database",
    //   post: "Manager",
    //   maxPrice: 40000,
    //   minPrice: 10000,
    //   rateLow: 1000,
    //   rateHigh: 2000,
    //   location: "Mombasa, Kenya",
    //   description:
    //     "The Manager is responsible for proper use, care, and maintenance of the dish machine. The   Dishwasher is also responsible for minor interior and exterior maintenance (snow & ice removal, trash…",
    //   companyLogo:
    //     "https://thedatabase.co.ke/static/assets/img/brand/dblogo.png",
    //   categories: [
    //     {
    //       id: 1,
    //       title: "Internship",
    //       slug: "internship",
    //     },
    //     {
    //       id: 2,
    //       title: "Temporary",
    //       slug: "temporary",
    //     },
    //     {
    //       id: 3,
    //       title: "Full Time",
    //       slug: "full-time",
    //     },
    //   ],
    // },
  ];
  const comments = [
    {
      id: 1,
      name: "Someone You Know",
      imageUrl:
        "https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/resumes-list-avatar-01.png",
      comment:
        "Nam eu eleifend nulla. Duis consectetur sit amet risus sit amet   venenatis. Pellentesque pulvinar ante a tincidunt placerat. Donec   dapibus efficitur arcu, a rhoncus lectus egestas elementum.",
      position: "Hr Specialist",
    },
    {
      id: 2,
      name: "Someone Else",
      imageUrl:
        "https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/resumes-list-avatar-01.png",
      comment:
        "Nam eu eleifend nulla. Duis consectetur sit amet risus sit amet   venenatis. Pellentesque pulvinar ante a tincidunt placerat. Donec   dapibus efficitur arcu, a rhoncus lectus egestas elementum.",
      position: "Hr Specialist",
    },
    {
      id: 3,
      name: "Someone Famous",
      imageUrl:
        "https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/resumes-list-avatar-01.png",
      comment:
        "Nam eu eleifend nulla. Duis consectetur sit amet risus sit amet   venenatis. Pellentesque pulvinar ante a tincidunt placerat. Donec   dapibus efficitur arcu, a rhoncus lectus egestas elementum.",
      position: "Hr Specialist",
    },
  ];
  const articles = [
    {
      id: 1,
      title: "Jobs",
      imgUrl:
        "https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/blog-post-02-498x315.jpg",
      content:
        "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C",
      slug: "jobs",
    },
    {
      id: 2,
      title: "Gigs",
      imgUrl:
        "https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/blog-post-03-498x315.jpg",
      content:
        "Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate",
      slug: "gigs",
    },
    {
      id: 3,
      title: "Intern Volunteer",
      imgUrl:
        "https://39sf152pf74z2negmt1gi8ik-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/blog-post-01-498x315.jpg",
      content: "One morning, when Gregor Samsa woke from troubled dreams, he",
      slug: "intern volunteer",
    },
  ];
  const spotlightContent = jobs.map((job, index) => (
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

  const contents = [
    {
      id: 1,
      title: "CV",
      description:
        "Lorem Ipsum is simply dummy text of the printing passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      title: "Blogs",
      description:
        "Lorem Ipsum is simply dummy text of the printing passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 3,
      title: "Intern Volunteer",
      description:
        "Lorem Ipsum is simply dummy text of the printing passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];

  const reviews = [
    {
      id: 1,
      title: "CEO & Co Founder - The Database",
      review:
        "Lorem Ipsum is simply dummy text of the printing passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      title: "HR Manager - The Database",
      review:
        "Lorem Ipsum is simply dummy text of the printing passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 3,
      title: "Lead Engineer - The Database",
      review:
        "Lorem Ipsum is simply dummy text of the printing passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 4,
      title: "System Analyst - The Database",
      review:
        "Lorem Ipsum is simply dummy text of the printing passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 5,
      title: "Market Consultant - The Database",
      review:
        "Lorem Ipsum is simply dummy text of the printing passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];
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
            <H3>Recent Posts</H3>
            {articles ? (
              <ArticleWrapper>
                {articles.map((article, index) => (
                  <Article key={index}>
                    <Figure>
                      <Link to={article.slug}>
                        <ImageWrapper
                          url={article.imgUrl}
                          alt={`article image`}
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
                      title="Read More ..."
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
                </JobSpotlight>
              </RightWrapper>
            </JobsRightCol>
            <Br />
          </RowWrapper>
        </Container>
        <Container>
          <RowContent>
            {contents.map((content, index) => (
              <Card
                key={index}
                title={content.title}
                description={content.description}
              />
            ))}
          </RowContent>
        </Container>

        {/* AD BANNER SECTION */}
        <Container>
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
                  <CustomCarousel
                    deviceType={deviceType}
                    content={userComment}
                    perView={3}
                    itemClass={{ display: "flex" }}
                  />
                  {/* {userComment} */}
                </Comments>
              </div>
            </div>
            <Br />
          </UserComments>
        </Container>
        <Container>
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
      </MainContentArea>
      <FooterContainer />
    </>
  );
}
export default LandingPage;
