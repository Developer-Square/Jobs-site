import gql from "graphql-tag";

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