import { NextRequest, NextResponse } from "next/server";
import { UserCookie } from "./interfaces";
import { USER_AUTH_COOKIE_KEY, USER_AUTH_COOKIE_OPTIONS } from "./constants";
import { isUserCookie } from "./schemas";

export async function middleware(req: NextRequest) {

    const res = NextResponse.next();
    let userAuth: UserCookie = JSON.parse(req.cookies.get(USER_AUTH_COOKIE_KEY)?.value || '{}');

    if (!isUserCookie(userAuth)) {

        userAuth = {
            authenticated: false,
            token: null,
            preferences: {
                theme: 'light'
            }
        } as UserCookie;

        res.cookies.set(USER_AUTH_COOKIE_KEY, JSON.stringify(userAuth), USER_AUTH_COOKIE_OPTIONS);

    }

    return res;

}