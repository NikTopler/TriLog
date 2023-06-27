import { USER_AUTH_COOKIE_KEY } from "@/constants";
import { UserCookie } from "@/types";
import { isUserCookie } from "@/schemas";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

function getUserCookie(req?: NextRequest) {

    let userCookie: unknown = JSON.parse(
        (req
            ? req.cookies.get(USER_AUTH_COOKIE_KEY)?.value
            : cookies().get(USER_AUTH_COOKIE_KEY)?.value
        )
        || '{}');

    if (!isUserCookie(userCookie)) {

        userCookie = {
            authenticated: false,
            accessToken: null,
            refreshToken: null
        };

    }

    return userCookie as UserCookie;
}

export default getUserCookie;