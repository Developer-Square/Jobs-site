// component's config object.
const components = {
  admin: {
    component: "Admin",
    url: "/admin",
    title: "Admin",
    icon: "Category",
    module: 1,
  },
  users: {
    component: "FormikCOntainer",
    url: "/test",
    title: "FormikContainer",
    icon: "Category",
    module: 1,
  },
  dashboard: {
    component: "Dashboard",
    url: "",
    title: "Dashboard",
    icon: "Category",
    module: 1,
  },
  manager: {
    component: "Manager",
    url: "/manager",
    title: "Manager",
    icon: "Category",
    module: 1,
  },
  customers: {
    component: "Customers",
    url: "/customers",
    title: "Customers",
    icon: "Category",
    module: 1,
  },
  service1: {
    component: "Service1",
    url: "/service1",
    title: "Service1",
    icon: "Category",
    module: 1,
  },
  service2: {
    component: "Service2",
    url: "/service2",
    title: "Service2",
    icon: "Category",
    module: 1,
  },
  messages: {
    component: "Messages",
    url: "/messages",
    title: "messages",
    icon: "Category",
    module: 1,
  },
  jobAlerts: {
    component: "JobAlerts",
    url: "/job-alerts",
    title: "Job Alerts",
    icon: "Category",
    module: 1,
  },
  gigAlerts: {
    component: "gigAlerts",
    url: "/gig-alerts",
    title: "Gig Alerts",
    icon: "Category",
    module: 1,
  },
  bookmarks: {
    component: "Bookmarks",
    url: "/bookmarks",
    title: "Bookmarks",
    icon: "Category",
    module: 1,
  },
  addResume: {
    component: "AddResume",
    url: "/add-resume",
    title: "Add Resume",
    icon: "Category",
    module: 1,
  },
  manageResume: {
    component: "ManageResume",
    url: "/manage-resume",
    title: "Manage Resume",
    icon: "Category",
    module: 1,
  },
  submitJob: {
    component: "SubmitJob",
    url: "/submit-job",
    title: "Submit Job",
    icon: "Category",
    module: 1,
  },
  // manageJobs: {
  //   component: "ManageJobs",
  //   url: "/manage-jobs",
  //   title: "Manage Jobs",
  //   icon: "Category",
  //   module: 1,
  // },
  profile: {
    component: "Profile",
    url: "/profile",
    title: "Profile",
    icon: "Category",
    module: 1,
  },
  jobs: {
    component: "Jobs",
    url: "/jobs",
    title: "Gigs",
    icon: "Category",
    module: 1,
  },
  gigs: {
    component: "Gigs",
    url: "/gigs",
    title: "Gigs",
    icon: "Category",
    module: 1,
  },
  internships: {
    component: "Internships",
    url: "/internships",
    title: "Internships",
    icon: "Category",
    module: 1,
  },
  manageJobs: {
    component: "JobManage",
    url: "/jobs/:jobID",
    title: "Gigs",
    icon: "Category",
    module: 1,
  },
  manageGigs: {
    component: "GigManage",
    url: "/gigs/:jobID",
    title: "Gigs",
    icon: "Category",
    module: 1,
  },
  manageInternships: {
    component: "InternshipManage",
    url: "/internships/:jobID",
    title: "Internships",
    icon: "Category",
    module: 1,
  },
};

// modules for grouping.
const modules = {
  0: {
    title: "Dashboard",
    icon: "home",
    isExpendable: true,
  },
};

// component's access to roles.
const rolesConfig = {
  admin: {
    routes: [...Object.values(components)],
  },
  manager: {
    routes: [
      components.dashboard,
      components.manager,
      components.customers,
      components.service1,
      components.service2,
    ],
  },
  main: {
    routes: [
      components.dashboard,
      components.messages,
      components.bookmarks,
      components.jobAlerts,
      components.gigAlerts,
    ],
  },
  employer: {
    routes: [components.manageJobs, components.submitJob],
  },
  employee: {
    routes: [components.addResume, components.manageResume],
  },
  common: {
    routes: [
      {
        component: "Home",
        url: "",
        title: "Home",
        icon: "Category",
        module: 1,
      },
      {
        component: "Profile",
        url: "/profile",
        title: "Profile",
        icon: "Category",
        module: 1,
      },
      components.dashboard,
      components.messages,
      components.bookmarks,
      components.jobAlerts,
      components.gigAlerts,
    ],
  },
};

export { modules, rolesConfig };
