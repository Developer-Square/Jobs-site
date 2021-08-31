import gql from "graphql-tag";

export const INDUSTRY_MUTATION = gql`
  mutation IndustryMutation(
    $parent: ID
    $description: JSONString
    $descriptionPlaintext: String
    $name: String
    $icon: String
    $seoTitle: String
    $seoDescription: String
    $backgroundImage: BaseUpload
    $backgroundImageAlt: String
  ) {
    createIndustry(
      input: {
        description: $description
        descriptionPlaintext: $descriptionPlaintext
        name: $name
        icon: $icon
        seo: { title: $seoTitle, description: $seoDescription }
        backgroundImage: $backgroundImage
        backgroundImageAlt: $backgroundImageAlt
      }
      parent: $parent
    ) {
      success
      industry {
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
        ancestors(first: 10) {
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
        children(first: 10) {
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
      vacancyErrors {
        field
        message
        code
      }
      errors {
        field
        message
      }
    }
  }
`;
export const INDUSTRY_UPDATE_MUTATION = gql`
  mutation IndustryUpdateMutation(
    $id: ID!
    $description: JSONString
    $descriptionPlaintext: String
    $name: String
    $icon: String
    $seoTitle: String
    $seoDescription: String
    $backgroundImage: BaseUpload
    $backgroundImageAlt: String
  ) {
    updateIndustry(
      id: $id
      input: {
        description: $description
        descriptionPlaintext: $descriptionPlaintext
        name: $name
        icon: $icon
        seo: { title: $seoTitle, description: $seoDescription }
        backgroundImage: $backgroundImage
        backgroundImageAlt: $backgroundImageAlt
      }
    ) {
      success
      industry {
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
        ancestors(first: 10) {
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
        children(first: 10) {
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
      vacancyErrors {
        field
        message
        code
      }
      errors {
        field
        message
      }
    }
  }
`;
