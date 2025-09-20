import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MYCA",
    short_name: "MYCA",
    description: "An app to manage your car services",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      // {
      //   src: "/icon-mask.png",
      //   type: "image/png",
      //   sizes: "512x512",
      //   purpose: "maskable",
      // },
    ],
  };
}
