import gql from "graphql-tag";
import { addressFragment } from "graphql/fragments";

export const educationItemFragment = gql`
  fragment EducationItem on EducationItem {
    id
    slug
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    description
    descriptionPlaintext
    institution
    fieldOfStudy
    gpa
    level
    order
    degree
    schoolStart
    schoolEnd
    education {
      id
      heading
    }
  }
`;

export const educationFragment = gql`
  ${educationItemFragment}
  fragment Education on EducationNode {
    id
    visible
    heading
    slug
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    description
    descriptionPlaintext
    items {
      ...EducationItem
    }
    resume {
      id
      name
    }
  }
`;

export const skillItemFragment = gql`
  fragment SkillItem on SkillItem {
    slug
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    id
    name
    order
    level
    proficiency
    skill {
      id
      heading
    }
  }
`;
export const skillsFragment = gql`
  ${skillItemFragment}
  fragment Skill on SkillNode {
    slug
    visible
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    items {
      ...SkillItem
    }
    resume {
      id
      name
    }
  }
`;

export const hobbyItemFragment = gql`
  fragment HobbyItem on HobbyItem {
    slug
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    id
    order
    name
    hobby {
      id
      heading
    }
  }
`;
export const hobbiesFragment = gql`
  ${hobbyItemFragment}
  fragment Hobby on HobbyNode {
    slug
    visible
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    items {
      ...HobbyItem
    }
    resume {
      id
      name
    }
  }
`;
export const workItemFragment = gql`
  fragment WorkItem on WorkItem {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    order
    company
    position
    workStart
    workEnd
    achievements
    website
    work {
      id
      heading
    }
  }
`;
export const workFragment = gql`
  ${workItemFragment}
  fragment Work on WorkNode {
    slug
    visible
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    items {
      ...WorkItem
    }
    resume {
      id
      name
    }
  }
`;

export const awardItemFragment = gql`
  fragment AwardItem on AwardItem {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    order
    organization
    title
    date
    award {
      id
      heading
    }
  }
`;
export const awardsFragment = gql`
  ${awardItemFragment}
  fragment Award on AwardNode {
    slug
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    id
    heading
    visible
    items {
      ...AwardItem
    }
    resume {
      id
      name
    }
  }
`;
export const certificationItemFragment = gql`
  fragment CertificationItem on CertificationItem {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    order
    issuer
    title
    date
    certification {
      id
      heading
    }
  }
`;
export const certificationsFragment = gql`
  ${certificationItemFragment}
  fragment Certification on CertificationNode {
    slug
    visible
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    items {
      ...CertificationItem
    }
    resume {
      id
      name
    }
  }
`;
export const languageItemFragment = gql`
  fragment LanguageItem on LanguageItem {
    slug
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    level
    name
    order
    fluency
    language {
      id
      heading
    }
  }
`;
export const languagesFragment = gql`
  ${languageItemFragment}
  fragment Language on LanguageNode {
    slug
    visible
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    items {
      ...LanguageItem
    }
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
    visible
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
    template
    fontSize
    language
    layouts {
      ...Layout
    }
    resume {
      id
      name
    }
  }
`;
export const projectItemFragment = gql`
  fragment ProjectItem on ProjectItem {
    slug
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    id
    title
    startDate
    endDate
    link
    order
    description
    descriptionPlaintext
    project {
      id
      heading
    }
  }
`;
export const projectsFragment = gql`
  ${projectItemFragment}
  fragment Project on ProjectNode {
    slug
    uuid
    visible
    createdAt
    updatedAt
    isDeleted
    isActive
    id
    heading
    items {
      ...ProjectItem
    }
    resume {
      id
      name
    }
  }
`;
export const referenceItemFragment = gql`
  fragment ReferenceItem on ReferenceItem {
    slug
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    id
    order
    email
    position
    fullName
    phone
    reference {
      id
      heading
    }
  }
`;
export const referencesFragment = gql`
  ${referenceItemFragment}
  fragment Reference on ReferenceNode {
    slug
    visible
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    items {
      ...ReferenceItem
    }
    resume {
      id
      name
    }
  }
`;
export const socialItemFragment = gql`
  fragment SocialItem on SocialItem {
    slug
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    id
    order
    link
    network
    username
    social {
      id
      heading
    }
  }
`;
export const socialsFragment = gql`
  ${socialItemFragment}
  fragment Social on SocialNode {
    slug
    visible
    description
    uuid
    createdAt
    updatedAt
    isDeleted
    isActive
    descriptionPlaintext
    id
    heading
    items {
      ...SocialItem
    }
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
    objective {
      visible
      heading
      descriptionPlaintext
    }
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
    name
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
    preview
    description
    descriptionPlaintext
    id
    objective {
      id
      visible
      heading
      descriptionPlaintext
    }
    owner {
      id
      firstName
      lastName
      fullName
      email
      phone
      avatar {
        url
        alt
      }
      seeker {
        id
        dateOfBirth
        title
      }
      defaultAddress {
        id
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          code
          country
        }
        countryArea
        phone
      }
    }
    public
    name
    education {
      ...Education
    }
    skill {
      ...Skill
    }
    hobby {
      ...Hobby
    }
    work {
      ...Work
    }
    award {
      ...Award
    }
    certification {
      ...Certification
    }
    language {
      ...Language
    }
    resumemetadata {
      ...ResumeMetaData
    }
    project {
      ...Project
    }
    reference {
      ...Reference
    }
    social {
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
