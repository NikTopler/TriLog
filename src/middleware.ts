import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "./errors";
import { apiAuthMiddleware, userAuthMiddleware } from "./middlewares";
import { AUTH_COOKIE_KEY, AUTH_COOKIE_OPTIONS } from "./constants";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {

    const res = NextResponse.next();

    if (PUBLIC_FILE.test(req.nextUrl.pathname)
        || req.nextUrl.pathname.startsWith('/_next')
        || req.nextUrl.pathname.startsWith('/favicon.ico')) {
        return res;
    }

    try {

        apiAuthMiddleware(req);

        const authCookie = await userAuthMiddleware(req);
        if (authCookie) {
            res.cookies.set(
                AUTH_COOKIE_KEY,
                JSON.stringify(authCookie),
                AUTH_COOKIE_OPTIONS
            );
        }

    } catch (error: any) {

        if (error instanceof AuthError && error.redirectUrl) {
            return NextResponse.redirect(error.redirectUrl);
        }

        return NextResponse.json({
            success: false,
            error: error.message
        });

    }

    return res;

}