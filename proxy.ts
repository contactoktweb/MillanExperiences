import { NextResponse, type NextRequest } from "next/server"

/*
  `?lang=es|en` selects the language for this request (and remembers it).
  The site otherwise reads the NEXT_LOCALE cookie, which crawlers and link
  previews (Google, WhatsApp…) never send — so without this they would
  only ever see English.
*/
export function proxy(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang")
  if (lang !== "es" && lang !== "en") return NextResponse.next()

  const headers = new Headers(request.headers)
  const otherCookies = (headers.get("cookie") || "")
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c && !c.startsWith("NEXT_LOCALE="))
  headers.set("cookie", [...otherCookies, `NEXT_LOCALE=${lang}`].join("; "))

  const response = NextResponse.next({ request: { headers } })
  response.cookies.set("NEXT_LOCALE", lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" })
  return response
}

export const config = {
  // Pages only: skip API routes, the Studio, Next internals and static files.
  matcher: ["/((?!api|admin|_next|.*\\..*).*)"],
}
