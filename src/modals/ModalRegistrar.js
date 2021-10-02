import React, { memo } from "react";
import AuthModal from "./AuthModal";
import AwardModal from "./sections/AwardModal";
import CertificateModal from "./sections/CertificateModal";
import EducationModal from "./sections/EducationModal";
import ExportModal from "./sections/ExportModal";
import HobbyModal from "./sections/HobbyModal";
import ImportModal from "./sections/ImportModal";
import LanguageModal from "./sections/LanguageModal";
import ProjectModal from "./sections/ProjectModal";
import ReferenceModal from "./sections/ReferenceModal";
import ResumeModal from "./ResumeModal";
import AddressModal from "./AddressModal";
import ApplicationModal from "./ApplicationModal";
import SkillModal from "./sections/SkillModal";
import SocialModal from "./sections/SocialModal";
import WorkModal from "./sections/WorkModal";
import DeleteAccountModal from "./DeleteAccountModal";
import UpdateApplicationModal from "./UpdateApplicationModal";
import IndustriesModal from "./IndustriesModal";

const ModalRegistrar = () => (
  <>
    <AuthModal />
    <ResumeModal />
    <AddressModal />
    <ApplicationModal />
    <SocialModal />
    <WorkModal />
    <EducationModal />
    <ProjectModal />
    <AwardModal />
    <CertificateModal />
    <SkillModal />
    <HobbyModal />
    <LanguageModal />
    <ReferenceModal />
    <ImportModal />
    <ExportModal />
    <DeleteAccountModal />
    <UpdateApplicationModal />
    <IndustriesModal />
  </>
);

export default memo(ModalRegistrar);
