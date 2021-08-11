import { lazy } from "react";

const Dashboard = lazy(() => import("pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("pages/Profile/Profile"));
const Vacancy = lazy(() => import("pages/Vacancy/Vacancy"));
const ProfileView = lazy(() => import("pages/Profile/ProfileView"));
const Jobs = lazy(() => import("pages/Jobs/Jobs"));
const Gigs = lazy(() => import("pages/Gigs/Gigs"));
const MyGigs = lazy(() => import("pages/Gigs/MyGigs"));
const Internships = lazy(() => import("pages/Internships/Internships"));
const JobManage = lazy(() => import("pages/Jobs/JobManage"));
const MyInternships = lazy(() => import("pages/Internships/MyInternships"));
const MyJobs = lazy(() => import("pages/Jobs/MyJobs"));
const GigManage = lazy(() => import("pages/Gigs/GigManage"));
const InternshipManage = lazy(() =>
  import("pages/Internships/InternshipManage"),
);
const Applications = lazy(() => import("pages/Applications/Applications"));
const SingleView = lazy(() => import("pages/SingleView/SingleView"));
const ResumeDashboard = lazy(() => import("pages/Resume/ResumeDashboard"));
const ResumeBuilder = lazy(() => import("pages/Resume/ResumeBuilder"));
const Bookmarks = lazy(() => import("pages/Bookmarks/Bookmarks"));
const ManageVacancies = lazy(() =>
  import("pages/ManageVacancies/ManageVacancies"),
);
const ApplicationsManager = lazy(() =>
  import("pages/Applications/ApplicationsManager"),
);

export {
  Dashboard,
  Profile,
  Vacancy,
  Jobs,
  MyJobs,
  Gigs,
  MyGigs,
  Internships,
  MyInternships,
  JobManage,
  GigManage,
  InternshipManage,
  Applications,
  ProfileView,
  SingleView,
  ResumeDashboard,
  ResumeBuilder,
  Bookmarks,
  ApplicationsManager,
  ManageVacancies,
};
