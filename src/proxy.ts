import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {}

export const config = {
  /**
   * @description
   * Runs for every route except
   * landing page
   * api calls
   * login & auth pages
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|login).*)"],
};
