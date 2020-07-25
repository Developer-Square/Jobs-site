// component's config object.
const components = {
  admin: {
    component: "Admin",
    url: "/admin",
    title: "Admin",
    icon: "menu",
    module: 1,
  },
  users: {
    component: "FormikCOntainer",
    url: "/test",
    title: "FormikContainer",
    icon: "menu",
    module: 1,
  },
  dashboard: {
    component: "Dashboard",
    url: "/dashboard",
    title: "Dashboard",
    icon: "menu",
    module: 1,
  },
  manager: {
    component: "Manager",
    url: "/manager",
    title: "Manager",
    icon: "menu",
    module: 1,
  },
  customers: {
    component: "Customers",
    url: "/customers",
    title: "Customers",
    icon: "menu",
    module: 1,
  },
  service1: {
    component: "Service1",
    url: "/service1",
    title: "Service1",
    icon: "menu",
    module: 1,
  },
  service2: {
    component: "Service2",
    url: "/service2",
    title: "Service2",
    icon: "menu",
    module: 1,
  },
  messages: {
    component: "Messages",
    url: "/messages",
    title: "messages",
    icon: "menu",
    module: 1,
  },
  jobAlerts: {
    component: "JobAlerts",
    url: "/job-alerts",
    title: "Job Alerts",
    icon: "menu",
    module: 1,
  },
  gigAlerts: {
    component: "gigAlerts",
    url: "/gig-alerts",
    title: "Gig Alerts",
    icon: "menu",
    module: 1,
  },
  bookmarks: {
    component: "Bookmarks",
    url: "/bookmarks",
    title: "Bookmarks",
    icon: "menu",
    module: 1,
  },
  addResume: {
    component: "AddResume",
    url: "/add-resume",
    title: "Add Resume",
    icon: "menu",
    module: 1,
  },
  manageResume: {
    component: "ManageResume",
    url: "/manage-resume",
    title: "Manage Resume",
    icon: "menu",
    module: 1,
  },
  submitJob: {
    component: "SubmitJob",
    url: "/submit-job",
    title: "Submit Job",
    icon: "menu",
    module: 1,
  },
  manageJobs: {
    component: "ManageJobs",
    url: "/manage-jobs",
    title: "Manage Jobs",
    icon: "menu",
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
        icon: "menu",
        module: 1,
      },
      {
        component: "Profile",
        url: "/profile",
        title: "Profile",
        icon: "menu",
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
