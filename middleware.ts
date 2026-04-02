import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_EXEMPT_PATHS = new Set([
  "/application/sign-in",
  "/application/sign-up",
  "/application/forgot-password",
]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const normalizedPathname = pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (!normalizedPathname.startsWith("/application")) return NextResponse.next();
  if (AUTH_EXEMPT_PATHS.has(normalizedPathname)) return NextResponse.next();

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/application/sign-in";
    url.searchParams.set("callbackUrl", normalizedPathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/application", "/application/:path*"],
};

