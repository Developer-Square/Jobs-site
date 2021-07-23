import gql from "graphql-tag";

import { addressFragment } from "graphql/fragments";

export const educationFragment = gql`
  fragment Education on EducationNode {
    id
    heading
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    heading
    institution
    fieldOfStudy
    gpa
    level
    schoolStart
    schoolEnd
    resume {
      id
      name
    }
  }
`;
export const skillsFragment = gql`
  fragment Skill on SkillNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    name
    proficiency
    resume {
      id
      name
    }
  }
`;
export const hobbiesFragment = gql`
  fragment Hobby on HobbyNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    name
    resume {
      id
      name
    }
  }
`;
export const workFragment = gql`
  fragment Work on WorkNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    company
    position
    workStart
    workEnd
    achievements
    website
    resume {
      id
      name
    }
  }
`;
export const awardsFragment = gql`
  fragment Award on AwardNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    organization
    title
    date
    resume {
      id
      name
    }
  }
`;
export const certificationsFragment = gql`
  fragment Certification on CertificationNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    issuer
    title
    date
    resume {
      id
      name
    }
  }
`;
export const languagesFragment = gql`
  fragment Language on LanguageNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    level
    title
    resume {
      id
      name
    }
  }
`;
export const layoutFragment = gql`
  fragment Layout on LayoutNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    metadata {
      id
      slug
      description
    }
    name
    collection
  }
`;

export const resumemetadataFragment = gql`
  ${layoutFragment}
  fragment ResumeMetaData on ResumeMetaDataNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    backgroundColor
    primaryColor
    textColor
    font
    fontSize
    language
    allLayouts {
      ...Layout
    }
    resume {
      id
      name
    }
  }
`;
export const projectsFragment = gql`
  fragment Project on ProjectNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    title
    startDate
    endDate
    link
    resume {
      id
      name
    }
  }
`;
export const referencesFragment = gql`
  fragment Reference on ReferenceNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    email
    position
    fullName
    mobile
    resume {
      id
      name
    }
  }
`;
export const socialsFragment = gql`
  fragment Social on SocialNode {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    owner {
      id
      phone
      fullName
    }
    link
    network
    username
    resume {
      id
      name
    }
  }
`;
export const simpleResumeFragment = gql`
  ${addressFragment}
  fragment Resume on ResumeNode {
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
    descriptionPlaintext
    id
    objective
    public
    name
    addresses {
      ...Address
    }
  }
`;

export const resumeFragment = gql`
  ${addressFragment}
  ${educationFragment}
  ${skillsFragment}
  ${hobbiesFragment}
  ${workFragment}
  ${awardsFragment}
  ${certificationsFragment}
  ${languagesFragment}
  ${resumemetadataFragment}
  ${projectsFragment}
  ${referencesFragment}
  ${socialsFragment}
  ${layoutFragment}
  fragment Resume on ResumeNode {
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
    descriptionPlaintext
    id
    objective
    public
    name
    allEducation {
      ...Education
    }
    allSkills {
      ...Skill
    }
    allHobbies {
      ...Hobby
    }
    allWork {
      ...Work
    }
    allAwards {
      ...Award
    }
    allCertifications {
      ...Certification
    }
    allLanguages {
      ...Language
    }
    allResumemetadata {
      ...ResumeMetaData
    }
    allProjects {
      ...Project
    }
    allReferences {
      ...Reference
    }
    allSocials {
      ...Social
    }
    addresses {
      ...Address
    }
    allLayouts {
      ...Layout
    }
  }
`;
