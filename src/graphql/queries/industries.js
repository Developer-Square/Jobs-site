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
// , sortBy: {  field: VACANCY_COUNT, direction: DESC }

export const GET_COUNTED_INDUSTRIES = gql`
  query Industries($first: Int, $sortBy: IndustrySortingInput) {
    industries(first: $first, sortBy: $sortBy) {
      edges {
        node {
          name
          id
          icon
          backgroundImage {
            url
            alt
          }
          vacanciesCount
          seoTitle
          seoDescription
          description
        }
      }
    }
  }
`;

export const ALL_INDUSTRIES = gql`
  query AllIndustries($first: Int, $last: Int) {
    allIndustries {
      id
      description
      descriptionPlaintext
      seoTitle
      seoDescription
      name
      parent {
        id
        description
        seoTitle
        seoDescription
        name
      }
      icon
      level
      ancestors(first: $first, last: $last) {
        edges {
          node {
            id
            description
            seoTitle
            seoDescription
            name
          }
        }
      }
      children(first: $first, last: $last) {
        edges {
          node {
            id
            description
            seoTitle
            seoDescription
            name
          }
        }
      }
      backgroundImage {
        url
        alt
      }
      vacanciesCount
      url
    }
  }
`;
