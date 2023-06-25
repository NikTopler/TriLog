import { AUTH_COOKIE_KEY } from "@/constants";
import { AuthCookie } from "@/interfaces";
import { isAuthCookie } from "@/schemas";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

function getAuthCookie(req?: NextRequest) {

    let authCookie: unknown = JSON.parse(
        (req
            ? req.cookies.get(AUTH_COOKIE_KEY)?.value
            : cookies().get(AUTH_COOKIE_KEY)?.value
        )
        || '{}');

    if (!isAuthCookie(authCookie)) {

        authCookie = {
            authenticated: false,
            accessToken: null,
            refreshToken: null
        };

    }

    return authCookie as AuthCookie;
}

export default getAuthCookie;