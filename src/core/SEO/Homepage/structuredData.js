import urljoin from "url-join";

import { searchUrl } from "constants/routes.constants";

export const structuredData = (shop) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: "The Database - Jobs Need People",
    name: "The Database Kenya",
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=q",
      target: urljoin(window.location.href, searchUrl, "?q={q}"),
    },
    url: window.location.href,
  });
};
