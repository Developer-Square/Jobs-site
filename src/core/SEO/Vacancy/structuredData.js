// const getVariantsStructuredData = (variants) => {
//   const inStock = "https://schema.org/InStock";
//   const outOfStock = "https://schema.org/OutOfStock";
//   return variants.map((variant) => ({
//     "@type": "Offer",
//     availability: variant.isAvailable ? inStock : outOfStock,
//     itemCondition: "https://schema.org/NewCondition",
//     price: variant.pricing.price.gross.amount.toFixed(2),
//     priceCurrency: variant.pricing.price.gross.currency,
//     sku: variant.sku,
//   }));
// };

export const structuredData = (vacancy) => {
  const images = vacancy.images.map((image) => new URL(image.url).pathname);
  // const { variants } = vacancy;

  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Internship",
    // "@type": "Vacancy",
    description: !vacancy.seoDescription
      ? `${vacancy.description}`
      : `${vacancy.seoDescription}`,
    image: images,
    name: !vacancy.seoTitle ? `${vacancy.name}` : `${vacancy.seoTitle}`,
    // offers: getVariantsStructuredData(variants),
    url: window.location.href,
  });
};
