import gql from "graphql-tag";

export const vacancyFragment = gql`
  fragment Vacancy on Vacancy {
    __typename
    id
    title
    jobType
    descriptionPlaintext
    description
    jobType
    timesViewed
    minQualification
    positions
    yearsOfExp
    isActive
    salary
    applicationUrl
    numberOfApplications
    shortlistedCount
    acceptedCount
    rejectedCount
    appliedCount
    interviewingCount
    payRate
    closingDate
    location
    createdAt
    isActive
    screeningQuestions {
      id
      questionType
      question
      required
      idealAnswer
    }
    amount {
      currency
      amount
    }
    creator {
      id
      fullName
      email
      avatar {
        url
        alt
      }
      socials {
        id
        network
        link
        username
      }
    }
    industry {
      name
      id
    }
    postedBy {
      name
      id
      website
      logo {
        url
        alt
      }
    }
  }
`;
