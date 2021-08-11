import React from "react";
import { TypedQuery } from "core/queries";
import gql from "graphql-tag";

export const manageResumes = gql`
  query UserList($first: Int!) {
    users(first: $first) {
      edges {
        node {
          id
          fullName
          isStaff
          isActive
        }
      }
    }
  }
`;

export const managevacancies = gql`
  query UserList($first: Int!) {
    users(first: $first) {
      edges {
        node {
          id
          fullName
          isStaff
          isActive
        }
      }
    }
  }
`;

export const manageApplications = gql`
  query UserList($first: Int!) {
    users(first: $first) {
      edges {
        node {
          id
          fullName
          isStaff
          isActive
        }
      }
    }
  }
`;

const DataCounter = ({ type }) => {
  const [queryType, setQueryType] = React.useState();
  switch (type) {
    case "manage-vacancies":
      setQueryType(managevacancies);
      break;
    case "manage-applications":
      setQueryType(managevacancies);
      break;
    case "manage-resumes":
      setQueryType(managevacancies);
      break;

    default:
      break;
  }

  const TypedCounterQuery = TypedQuery(queryType);
  if (queryType) {
    return null;
  }

  return (
    <TypedCounterQuery>
      {(theMutation, { loading }) => {
        const count = "2";
        return <span className="nav-tag">{count}</span>;
      }}
    </TypedCounterQuery>
  );
};

export default DataCounter;
