// import urljoin from "url-join";

// import { paths } from "@paths";

export const structuredData = (shop = null) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: shop
      ? shop?.description
      : "From Gigs to Internships to Jobs and Volunteering. students can gerrit, employers can get it, workers can gerrit. EVERYBODY can gerrit! TheDatabase, Jobs Need People!",
    name: shop ? shop?.name : "The Database Kenya",
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=q",
      target: window.location.href + "/vacancies/",
      // target: urljoin(window.location.href, paths.search, "?q={q}"),
    },
    url: window.location.href,
  });
};

// export const structuredData = (vacancy) => {
//   // const images = vacancy.images.map((image) => new URL(image.url).pathname);
//   // const { variants } = vacancy;

//   return JSON.stringify({
//     "@context": "https://schema.org/",
//     "@type": "Internship",
//     // "@type": "Vacancy",
//     description: !vacancy.seoDescription
//       ? `${vacancy.descriptionPlaintext}`
//       : `${vacancy.seoDescription}`,
//     image: vacancy.creator.avatar.url,
//     name: !vacancy.seoTitle ? `${vacancy.name}` : `${vacancy.seoTitle}`,
//     // offers: getVariantsStructuredData(variants),
//     url: window.location.href,
//   });
// };

export const jobStructuredData = (vacancy) => {
  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: vacancy?.title,
    description: vacancy?.descriptionPlaintext,
    identifier: {
      "@type": "PropertyValue",
      name: "Google",
      value: "1234567",
    },
    datePosted: vacancy?.createdAt,
    validThrough: vacancy?.closingDate,
    employmentType: vacancy?.jobType,
    hiringOrganization: {
      "@type": "Organization",
      name: vacancy?.postedBy?.name,
      sameAs: vacancy?.postedBy?.website,
      logo: vacancy?.postedBy?.logo?.url,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nairobi, Kenya",
        addressLocality: "Nairobi, Kenya",
        addressRegion: "NBI",
        postalCode: "00200",
        addressCountry: "KE",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: vacancy?.currency,
      value: {
        "@type": "QuantitativeValue",
        value: vacancy?.salary,
        unitText: vacancy?.payRate,
      },
    },
  });
};
