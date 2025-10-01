import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("jwt")?.value;

    const { pathname } = req.nextUrl;

    // Public routes
    const publicRoutes = ["/login", "/signup"];

    // 1️⃣ If logged in and tries to access login/signup → redirect to dashboard
    if (token && publicRoutes.includes(pathname)) {
        const dashboardUrl = new URL("/", req.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // 2️⃣ If not logged in and trying to access protected route → redirect to login
    const protectedRoutes = ["/", "/profile", "/settings"];
    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (!token && isProtected) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// 👇 Apply middleware only on selected routes
export const config = {
    matcher: [
        "/",
        "/profile",
        "/settings",
        "/login",
        "/signup",
    ],
};
