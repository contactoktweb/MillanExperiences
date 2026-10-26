// Legacy URLs → current pages. Single source for next.config.mjs (301/308
// redirects), the sitemap (redirected URLs are left out) and resolveHref()
// (links coming from Sanity skip the redirect hop).
export const LEGACY_REDIRECTS = [
  { source: "/villas-and-islands", destination: "/luxury-villas" },
  { source: "/boats-and-yachts", destination: "/speedboats" },
  { source: "/groups-and-events", destination: "/bachelor-bachelorette-parties" },
  { source: "/services", destination: "/services/concierge" },
]

const MAP = new Map(LEGACY_REDIRECTS.map((r) => [r.source, r.destination]))

/** @param {string | undefined | null} href */
export function resolveHref(href) {
  if (!href) return href
  const [path, rest = ""] = href.split(/(?=[?#])/)
  const target = MAP.get(path.replace(/\/$/, "") || "/")
  return target ? target + rest : href
}
