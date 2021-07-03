// component's config object.
const start = "Start";
const management = "Management";
const account = "Account";
const admin = "Admin";

const components = {
  admin: {
    component: "Admin",
    url: "/admin",
    title: "Admin",
    icon: "Category",
    module: 1,
    category: admin,
    children: [],
    dashboardItem: true,
  },
  dashboard: {
    component: "Dashboard",
    url: "",
    title: "Dashboard",
    icon: "Category",
    module: 1,
    category: start,
    children: [],
    dashboardItem: true,
  },
  messages: {
    component: "Messages",
    url: "/messages",
    title: "messages",
    icon: "Category",
    module: 1,
    category: start,
    children: [],
    dashboardItem: true,
  },
  bookmarks: {
    component: "Bookmarks",
    url: "/bookmarks",
    title: "Bookmarks",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboardItem: true,
  },
  manageResume: {
    component: "ManageResume",
    url: "/manage-resume",
    title: "Manage Resume",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboardItem: true,
  },
  addVacancy: {
    component: "AddVacancy",
    url: "/add-job",
    title: "Add Job",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboardItem: true,
  },
  resumeBuilder: {
    component: "ResumeBuilder",
    url: "/resume/builder/:resumeID",
    title: "Add Resume",
    icon: "Category",
    module: 1,
    category: management,
    dashboardItem: false,
  },

  resume: {
    component: "ResumeDashboard",
    url: "/resume",
    title: "Resume",
    icon: "Category",
    module: 1,
    category: management,
    children: [
      {
        component: "ResumeBuilder",
        url: "/builder/:resumeID",
        title: "Add Resume",
        icon: "Category",
        module: 1,
        dashboardItem: true,
      },
      {
        component: "ResumeDashboard",
        url: "",
        title: "Add/Manage Resumes",
        icon: "Category",
        module: 1,
        dashboardItem: true,
      },
      // {
      //   component: "Resume",
      //   url: "/view/:resumeID",
      //   title: "View Resume",
      //   icon: "Category",
      //   module: 1,
      //   dashboardItem: false,
      // },
    ],
    dashboardItem: true,
  },
  submitResume: {
    component: "SubmitResume",
    url: "/submit-resume",
    title: "Submit Resume",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboardItem: true,
  },
  profile: {
    component: "Profile",
    url: "/profile",
    title: "Profile",
    icon: "Category",
    module: 1,
    category: account,
    children: [],
    dashboardItem: true,
  },
};

// modules for grouping.
const modules = {
  0: {
    component: "Dashboard",
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
  individual: {
    routes: [],
  },
  business: {
    routes: [],
  },
  employer: {
    routes: [],
  },
  seeker: {
    routes: [],
  },
  institution: {
    routes: [],
  },
  manager: {
    routes: [],
  },
  main: {
    routes: [],
  },

  common: {
    routes: [
      components.profile,
      components.dashboard,
      // components.messages,
      // components.bookmarks,
      components.addVacancy,
      components.resumeBuilder,
      components.resume,
    ],
  },
};

export { modules, rolesConfig };
