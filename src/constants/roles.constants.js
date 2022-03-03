// component's config object.
// const start = "Start";
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
    category: account,
    children: [],
    dashboardItem: true,
  },
  messages: {
    component: "Messages",
    url: "/messages",
    title: "Messages",
    icon: "Category",
    module: 1,
    category: account,
    children: [],
    dashboardItem: false,
  },
  bookmarks: {
    component: "Bookmarks",
    url: "/bookmarks",
    title: "Saved Jobs",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboardItem: true,
  },
  vacancies: {
    component: "Vacancy",
    url: "/vacancies",
    title: "Jobs",
    icon: "Category",
    module: 1,
    category: management,
    children: [
      {
        component: "Vacancy",
        url: "/add-job",
        title: "Add Job",
        icon: "Category",
        module: 1,
        category: management,
        children: [],
        dashboardItem: true,
      },
      {
        component: "ManageVacancies",
        url: "/manage-jobs",
        title: "Manage Jobs",
        icon: "Category",
        module: 1,
        category: management,
        children: [],
        dashboardItem: true,
      },
      {
        component: "Vacancy",
        url: "/edit-job/:vacancyUpdateID",
        title: "Update Job",
        icon: "Category",
        module: 1,
        category: management,
        children: [],
        dashboardItem: false,
      },
    ],
    dashboardItem: true,
  },
  addVacancy: {
    component: "Vacancy",
    url: "/vacancies/add-job",
    title: "Add Job",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboardItem: false,
  },
  manageVacancies: {
    component: "ManageVacancies",
    url: "/vacancies/manage-jobs",
    title: "Manage Jobs",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboardItem: false,
  },
  updateVacancy: {
    component: "Vacancy",
    url: "/vacancies/edit-job/:vacancyUpdateID",
    title: "Update Job",
    icon: "Category",
    module: 1,
    category: management,
    children: [],
    dashboardItem: false,
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
  jobAppicationsView: {
    component: "ApplicationView",
    url: "/applications/:jobID/:applicationID",
    title: "View Single Application",
    icon: "Category",
    module: 1,
    category: management,
    dashboardItem: false,
  },
  jobAppications: {
    component: "JobApplications",
    url: "/applications/:jobID",
    title: "Sort Applications",
    icon: "Category",
    module: 1,
    category: management,
    dashboardItem: false,
  },
  applications: {
    component: "Applications",
    url: "/applications",
    title: "Applications",
    icon: "Category",
    module: 1,
    category: management,
    dashboardItem: true,
  },
  resumeDashboard: {
    component: "ResumeDashboard",
    url: "/resume",
    title: "Resume",
    icon: "Category",
    module: 1,
    category: management,
    dashboardItem: true,
  },
  billing: {
    component: "Billing",
    url: "/billing",
    title: "Billing",
    icon: "Category",
    module: 1,
    category: account,
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

// // modules for grouping.
// const modules = {
//   0: {
//     component: "Dashboard",
//     title: "Dashboard",
//     icon: "home",
//     isExpendable: true,
//   },
// };

// const allRoutes = (routes) => {
//   const parentObjects = Object.values(routes);
//   const childObjects = parentObjects.reduce((arr, obj) => {
//     if (obj.children) {
//       return arr.concat(obj.children);
//     }
//     return arr;
//   }, []);
//   console.log([...childObjects]);
//   console.log([...parentObjects]);
//   console.log([...parentObjects, ...childObjects]);
//   return [...parentObjects, ...childObjects];
// };
// component's access to roles.
const rolesConfig = {
  admin: {
    routes: [components.admin],
    // routes: allRoutes(components),
  },
  employer: {
    routes: [
      components.vacancies,
      components.addVacancy,
      components.updateVacancy,
      components.manageVacancies,
    ],
  },
  seeker: {
    routes: [
      components.resumeDashboard,
      components.resumeBuilder,
      // components.applications,
      // components.bookmarks,
    ],
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
      components.jobAppicationsView, //common
      components.jobAppications, //common
      components.applications, // commom
      components.bookmarks, //common
      components.messages, //common

      components.dashboard, //common
      components.profile, //common
      components.billing, //common

      // components.resumeDashboard, //seeker
      // components.resumeBuilder, //seeker

      // components.vacancies, // employer
      // components.addVacancy, //employer
      // components.updateVacancy, // employer
      // components.manageVacancies, // employer

      // components.messages,
    ],
  },
};

export { rolesConfig };
