import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = "https://https://myca.mora-ed.com";
  return [
    {
      url: `${baseURL}`,
    },
  ];
}
