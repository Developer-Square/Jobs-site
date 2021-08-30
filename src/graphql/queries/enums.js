import gql from "graphql-tag";

export const JobMinQualification = gql`
  query JobMinQualification {
    __type(name: "JobMinQualification") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const JobYearsOfExp = gql`
  query JobYearsOfExp {
    __type(name: "JobYearsOfExp") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const JobJobType = gql`
  query JobJobType {
    __type(name: "JobJobType") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const JobPayRate = gql`
  query JobPayRate {
    __type(name: "JobPayRate") {
      enumValues {
        name
        description
      }
    }
  }
`;
export const ApplicationStatus = gql`
  query ApplicationStatus {
    __type(name: "ApplicationStatus") {
      enumValues {
        name
        description
      }
    }
  }
`;
