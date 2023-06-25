import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "./errors";
import { AUTH_COOKIE_KEY, AUTH_COOKIE_OPTIONS } from "./constants";
import { authMiddleware } from "./middlewares";

export async function middleware(req: NextRequest) {

    const res = NextResponse.next();

    try {

        const authCookie = await authMiddleware(req);
        res.cookies.set(AUTH_COOKIE_KEY, JSON.stringify(authCookie), AUTH_COOKIE_OPTIONS);

    } catch (error: any) {

        if (error instanceof AuthError && error.redirectUrl) {
            return NextResponse.redirect(error.redirectUrl);
        }

    }

    return res;

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};