import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

// /tienda is private: it is kept out of the sitemap and served with
// noindex (meta + X-Robots-Tag) instead of a Disallow, so crawlers that
// find a link can still read the noindex directive and drop it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
