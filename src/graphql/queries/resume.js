import gql from "graphql-tag";
import { resumeFragment } from "graphql/fragments";

export const RESUMES_QUERY = gql`
  query Resumes {
    myResumes {
      name
      id
      slug
      description
      seoTitle
      seoDescription
      uuid
      createdAt
      updatedAt
      isDeleted
      privateMetadata
      metadata
      isActive
      preview
      description
      descriptionPlaintext
    }
  }
`;

export const FETCH_RESUME = gql`
  ${resumeFragment}
  query Resume($id: ID!) {
    resume(id: $id) {
      ...Resume
    }
  }
`;
