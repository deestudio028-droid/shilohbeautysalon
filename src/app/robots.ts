import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin/dashboard", "/admin/login"],
    },
    sitemap: "https://www.shilohbeautysalon.com/sitemap.xml",
  };
}
