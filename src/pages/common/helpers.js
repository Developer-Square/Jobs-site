export const categorySelector = (category) => {
  switch (category) {
    case "fulltime":
      return "jobs";
    case "Gig":
      return "gigs";
    case "parttime":
      return "jobs";
    case "volunteering":
      return "jobs";
    case "internship":
      return "internships";
    case "Internship":
      return "internships";
    case "gig":
      return "gigs";

    default:
      throw new Error(`Unsupported Category Type: ${category}`);
  }
};
