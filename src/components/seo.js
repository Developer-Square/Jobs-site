import React from "react";
import { Helmet } from "react-helmet";
import { BASE_GRAPHQL_URL } from "constants/constants";
import dbImage from "image/TheDBLogo.jpeg";

export const SEO = ({
  title,
  link,
  description,
  industry,
  css,
  js,
  company,
  location = "Nairobi, Kenya",
  image = dbImage,
  country = "Kenya",
  canonical = window.location.href,
}) => (
  <Helmet>
    <title>{title}</title>
    {link && <link rel="canonical" href={link} />}
    <link rel="preconnect" href={BASE_GRAPHQL_URL} />
    <meta name="description" content={description} />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta property="og:site_name" content="Proper Noun" />
    <meta property="og:url" content={`${canonical}`} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="@ThedatabaseKe" />
    <meta name="twitter:creator" content="@ThedatabaseKe" />
    <meta property="job:recent" content="recent" />
    <meta property="job:industry" content={industry || "All Industries"} />
    <meta property="job:country" content={country} />
    <meta property="job:location" content={location} />
    {company && <meta property="job:company" content={company} />}

    {css && <link rel="stylesheet" href={`${css}`} />}
    {image && <meta property="og:image" content={image || dbImage} />}
    {image && <meta name="twitter:image" content={`${image}`} />}
    {canonical && <link rel="canonical" href={`${canonical}`} />}
    {js && <script type="text/javascript" src={`${js}`} />}
  </Helmet>
);
