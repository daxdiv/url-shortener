import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { StatusCodes as HTTPStatusCodes } from "http-status-codes";

export async function middleware(req: NextRequest) {
  const shortenUrl = req.nextUrl.pathname.split("/")[1]; // NOTE: example pathname is /[url]
  const res = await fetch(`${req.nextUrl.origin}/api/url/${shortenUrl}`);

  if (res.status === HTTPStatusCodes.BAD_REQUEST) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const data = await res.json();

  return NextResponse.redirect(data.aliasOf, {
    status: HTTPStatusCodes.PERMANENT_REDIRECT,
  });
}

export const config = {
  // NOTE: this doesn't match useless stuff like /favicon.ico
  matcher: "/((?!api|_next/static|favicon.ico).*)",
};
