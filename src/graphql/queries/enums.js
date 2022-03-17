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
export const SeekerStatus = gql`
  query ApplicationStatus {
    __type(name: "SeekerStatus") {
      enumValues {
        name
        description
      }
    }
  }
`;
export const SeekerGender = gql`
  query ApplicationStatus {
    __type(name: "SeekerGender") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const EmployerWorkForce = gql`
  query EmployerWorkForce {
    __type(name: "EmployerWorkForce") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const InstitutionStudentCount = gql`
  query InstitutionStudentCount {
    __type(name: "InstitutionStudentCount") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const SeekerNationality = gql`
  query SeekerNationality {
    __type(name: "SeekerNationality") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const EducationItemLevel = gql`
  query EducationItemLevel {
    __type(name: "EducationItemLevel") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const ScreeningQuestionType = gql`
  query ScreeningQuestionQuestionType {
    __type(name: "ScreeningQuestionQuestionType") {
      enumValues {
        name
        description
      }
    }
  }
`;
