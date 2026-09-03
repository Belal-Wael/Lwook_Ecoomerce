import NextAuth from "next-auth"
import { NextResponse } from "next/server";
import authConfig from "./lib/auth.config";

const { auth: middleware } = NextAuth(authConfig);
const authRoutes = ['/login', '/register', '/forget-password', '/reset-password', '/verify-email'];
const protectedRoutes = ['/Profile']

export default middleware((req) => {
    const { nextUrl } = req;
    const path = nextUrl.pathname;
    const isUserLoggedIn: boolean = Boolean(req.auth);
    if (authRoutes.includes(path) && isUserLoggedIn)
        return NextResponse.redirect(new URL("/Profile", nextUrl))
    // if user not authenticated
    if (protectedRoutes.includes(path) && !isUserLoggedIn)
        return NextResponse.redirect(new URL("/login", nextUrl))
})
export const config = {
    matcher: ["/login", "/register", "/Profile", '/forget-password', '/reset-password', '/verify-email'] // middleware must operate with this path
}