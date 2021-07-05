import gql from "graphql-tag";

export const GET_INDUSTRIES = gql`
  query AllIndustries {
    allIndustries {
      name
      id
      icon
      backgroundImage {
        url
        alt
      }
      seoTitle
      seoDescription
      description
    }
  }
`;
