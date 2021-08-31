import { lazy } from "react";

const Admin = lazy(() => import("pages/Admin/Admin"));
const Dashboard = lazy(() => import("pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("pages/Profile/Profile"));
const Vacancy = lazy(() => import("pages/Vacancy/Vacancy"));
const Applications = lazy(() => import("pages/Applications/Applications"));
const ResumeDashboard = lazy(() => import("pages/Resume/ResumeDashboard"));
const ResumeBuilder = lazy(() => import("pages/Resume/ResumeBuilder"));
const Bookmarks = lazy(() => import("pages/Bookmarks/Bookmarks"));
const ManageVacancies = lazy(() =>
  import("pages/ManageVacancies/ManageVacancies"),
);

export {
  Admin,
  Dashboard,
  Profile,
  Vacancy,
  Applications,
  ResumeDashboard,
  ResumeBuilder,
  Bookmarks,
  ManageVacancies,
};
