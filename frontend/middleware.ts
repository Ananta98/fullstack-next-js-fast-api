import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isCookieExist = !!req.cookies.get("token");
  const isLoginPage = path.startsWith("/login");

  if (isCookieExist == false && !isLoginPage && !["/register"].includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isCookieExist && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export const config = {
  matcher: "/((?!api|_next|static|public|favicon.ico).*)",
};
