import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  // Define protected routes
  const isVaultRoute = nextUrl.pathname.startsWith("/vault");
  const isAuthRoute =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register");

  // Redirect unauthenticated users from vault routes to login
  if (isVaultRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Redirect authenticated users from auth routes to vault
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/vault", nextUrl));
  }

  // Allow the request to proceed
  return NextResponse.next();
});

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/vault/:path*", "/login", "/register"],
};
