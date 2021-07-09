import { GET_INDUSTRIES } from "common/queries";
import { TypedQuery } from "core/queries";
import gql from "graphql-tag";

export const GENDER_ENUM_QUERY = gql`
  query GetEnum {
    __type(name: "SeekerGender") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const STATUS_ENUM_QUERY = gql`
  query GetEnum {
    __type(name: "SeekerStatus") {
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

export const TypedEmployerWorkForceQuery = TypedQuery(EmployerWorkForce);

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

export const TypedInstitutionStudentCountQuery = TypedQuery(
  InstitutionStudentCount,
);

export const TypedIndustriesQuery = TypedQuery(GET_INDUSTRIES);
