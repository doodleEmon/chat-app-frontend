import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("jwt")?.value;

    const { pathname } = req.nextUrl;

    // Public routes
    const publicRoutes = ["/login", "/signup"];
    const protectedRoutes = ["/profile", "/settings"];

    // 1️⃣ Check if it's a public route
    if (publicRoutes.includes(pathname)) {
        if (token) {
            // If logged in, redirect to dashboard
            return NextResponse.redirect(new URL("/", req.url));
        }
        // If not logged in, allow access
        return NextResponse.next();
    }

    // 2️⃣ Check if it's a protected route OR root
    const isProtected = pathname === "/" || protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    if (!token && isProtected) {
        // If not logged in, redirect to login
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow access
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