import gql from "graphql-tag";
import { TypedQuery } from "core/queries";

export const GET_INSTITUTIONS = gql`
  query Institutions {
    allInstitutions {
      id
      name
    }
  }
`;

export const GET_COURSES = gql`
  query AllCoursess {
    allCourses {
      name
      id
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

export const GET_FILTERED_COURSES = gql`
  query Courses(
    $filter: CourseFilterInput
    $sortBy: CourseSortingInput
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    courses(
      filter: $filter
      sortBy: $sortBy
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          name
          id
          backgroundImage {
            url
            alt
          }
          seoTitle
          seoDescription
          description
        }
      }
    }
  }
`;

// export const ALL_COURSES = gql`
//   query AllIndustries($first: Int, $last: Int) {
//     all {
//       id
//       description
//       descriptionPlaintext
//       seoTitle
//       seoDescription
//       name
//       backgroundImage {
//         url
//         alt
//       }
//     }
//   }
// `;

export const TypedCourseQuery = TypedQuery(GET_COURSES);
