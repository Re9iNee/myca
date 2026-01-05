import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = "https://https:www.//myca.mora-ed.com";
  return [
    {
      url: `${baseURL}`,
    },
  ];
}
