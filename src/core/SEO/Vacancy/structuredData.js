export const structuredData = (vacancy) => {
  // const images = vacancy.images.map((image) => new URL(image.url).pathname);
  // const { variants } = vacancy;

  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Internship",
    // "@type": "Vacancy",
    description: !vacancy.seoDescription
      ? `${vacancy.description_plaintext}`
      : `${vacancy.seoDescription}`,
    image: vacancy.creator.avatar.url,
    name: !vacancy.seoTitle ? `${vacancy.name}` : `${vacancy.seoTitle}`,
    // offers: getVariantsStructuredData(variants),
    url: window.location.href,
  });
};
