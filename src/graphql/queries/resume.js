import gql from "graphql-tag";
import { resumeFragment } from "graphql/fragments";

export const RESUMES_QUERY = gql`
  query Resumes {
    myResumes {
      __typename
      id
      name
      updatedAt
      seoDescription
    }
  }
`;

export const FETCH_RESUME = gql`
  ${resumeFragment}
  query Resume($id: ID!) {
    resume(id: $id) {
      __typename
      ...Resume
    }
  }
`;
