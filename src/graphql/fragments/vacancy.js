import gql from "graphql-tag";

export const vacancyFragment = gql`
  fragment Vacancy on Vacancy {
    __typename
    id
    title
    jobType
    description
    jobType
    minQualification
    positions
    yearsOfExp
    salary
    applicationEmail
    numberOfApplications
    payRate
    closingDate
    location
    createdAt
    isActive
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
