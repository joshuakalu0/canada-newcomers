import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// export async function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // Get the token
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   // Check if the path is a protected route
//   const isProtectedRoute =
//     pathname.startsWith("/home") ||
//     pathname.startsWith("/map") ||
//     pathname.startsWith("/service") ||
//     pathname.startsWith("/saved-locations") ||
//     pathname.startsWith("/profile");

//   // Check if the path is an admin route
//   const isAdminRoute = pathname.startsWith("/admin");

//   // Check if the path is an auth route
//   const isAuthRoute =
//     pathname.startsWith("/login") || pathname.startsWith("/register");

//   // If the user is not authenticated and trying to access a protected route
//   if (!token && isProtectedRoute) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // If the user is authenticated but trying to access auth routes
//   if (token && isAuthRoute) {
//     return NextResponse.redirect(new URL("/home", request.url));
//   }

//   // If the user is not an admin but trying to access admin routes
//   if (isAdminRoute && (!token || token.role !== "ADMIN")) {
//     return NextResponse.redirect(new URL("/home", request.url));
//   }

//   return NextResponse.next();
// }

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/home/:path*",
    "/map/:path*",
    "/service/:path*",
    "/saved-locations/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
