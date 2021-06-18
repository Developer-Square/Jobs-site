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
    dashboard_item: true,
  },
  dashboard: {
    component: "Dashboard",
    url: "",
    title: "Dashboard",
    icon: "Category",
    module: 1,
    category: start,
    children: [],
    dashboard_item: true,
  },
  messages: {
    component: "Messages",
    url: "/messages",
    title: "messages",
    icon: "Category",
    module: 1,
    category: start,
    children: [],
    dashboard_item: true,
  },
  bookmarks: {
    component: "Bookmarks",
    url: "/bookmarks",
    title: "Bookmarks",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboard_item: true,
  },
  manageResume: {
    component: "ManageResume",
    url: "/manage-resume",
    title: "Manage Resume",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboard_item: true,
  },
  submitResume: {
    component: "SubmitResume",
    url: "/submit-resume",
    title: "Submit Resume",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboard_item: true,
  },
  profile: {
    component: "Profile",
    url: "/profile",
    title: "Profile",
    icon: "Category",
    module: 1,
    category: account,
    children: [],
    dashboard_item: true,
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
    routes: [...Object.values(components)],
  },
  business: {
    routes: [...Object.values(components)],
  },
  employer: {
    routes: [...Object.values(components)],
  },
  seeker: {
    routes: [...Object.values(components)],
  },
  institution: {
    routes: [...Object.values(components)],
  },
  manager: {
    routes: [components.dashboard],
  },
  main: {
    routes: [components.dashboard],
  },

  common: {
    routes: [
      components.profile,
      components.dashboard,
      components.messages,
      components.bookmarks,
    ],
  },
};

export { modules, rolesConfig };
