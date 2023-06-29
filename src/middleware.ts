import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "./errors";
import { USER_AUTH_COOKIE_KEY, USER_AUTH_COOKIE_OPTIONS } from "./constants";
import { apiAuthMiddleware, userAuthMiddleware } from "./middlewares";

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

        const userCookie = await userAuthMiddleware(req);
        if (userCookie) {
            res.cookies.set(
                USER_AUTH_COOKIE_KEY,
                JSON.stringify(userCookie),
                USER_AUTH_COOKIE_OPTIONS
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