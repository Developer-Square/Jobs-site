import { lazy } from "react";

const Admin = lazy(() => import("pages/Admin/Admin"));
const Dashboard = lazy(() => import("pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("pages/Profile/Profile"));
const Vacancy = lazy(() => import("pages/Vacancy/Vacancy"));
const Applications = lazy(() => import("pages/Applications/Applications"));
const ResumeDashboard = lazy(() => import("pages/Resume/ResumeDashboard"));
const ResumeBuilder = lazy(() => import("pages/Resume/ResumeBuilder"));
const Bookmarks = lazy(() => import("pages/Bookmarks/Bookmarks"));
const Billing = lazy(() => import("pages/Billing/Billing"));
const JobApplications = lazy(() =>
  import("pages/Applications/JobApplications"),
);
const ManageVacancies = lazy(() =>
  import("pages/ManageVacancies/ManageVacancies"),
);
const ApplicationView = lazy(() =>
  import("pages/Applications/ApplicationView"),
);
const Messages = lazy(() =>
  import("pages/Messages/Messages"),
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
  Billing,
  JobApplications,
  ManageVacancies,
  ApplicationView,
  Messages
};
