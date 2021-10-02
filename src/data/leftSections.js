/* eslint-disable import/no-anonymous-default-export */
import { AiFillSafetyCertificate, AiOutlineTwitter } from "react-icons/ai";
import { BsTools } from "react-icons/bs";
import { FaAward, FaProjectDiagram, FaUserFriends } from "react-icons/fa";
import {
  IoLogoGameControllerB,
  IoMdBriefcase,
  IoMdDocument,
} from "react-icons/io";
import { MdPerson, MdSchool, MdTranslate } from "react-icons/md";
import ModalEvents from "../constants/ModalEvents";

export default [
  {
    id: "profile",
    icon: MdPerson,
    fixed: true,
  },
  {
    id: "social",
    icon: AiOutlineTwitter,
    event: ModalEvents.SOCIAL_MODAL,
    fixed: true,
  },
  {
    id: "objective",
    icon: IoMdDocument,
  },
  {
    id: "work",
    icon: IoMdBriefcase,
    event: ModalEvents.WORK_MODAL,
  },
  {
    id: "education",
    icon: MdSchool,
    event: ModalEvents.EDUCATION_MODAL,
  },
  {
    id: "project",
    icon: FaProjectDiagram,
    event: ModalEvents.PROJECT_MODAL,
  },
  {
    id: "award",
    icon: FaAward,
    event: ModalEvents.AWARD_MODAL,
  },
  {
    id: "certification",
    icon: AiFillSafetyCertificate,
    event: ModalEvents.CERTIFICATION_MODAL,
  },
  {
    id: "skill",
    icon: BsTools,
    event: ModalEvents.SKILL_MODAL,
  },
  {
    id: "hobby",
    icon: IoLogoGameControllerB,
    event: ModalEvents.HOBBY_MODAL,
  },
  {
    id: "language",
    icon: MdTranslate,
    event: ModalEvents.LANGUAGE_MODAL,
  },
  {
    id: "reference",
    icon: FaUserFriends,
    event: ModalEvents.REFERENCE_MODAL,
  },
];
