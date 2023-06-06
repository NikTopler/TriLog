import { USER_AUTH_COOKIE_KEY, USER_AUTH_COOKIE_OPTIONS } from "@/constants";
import { ApiMessage } from "@/constants";
import { getUserCookie } from "@/helpers/api";
import { UserCookie } from "@/interfaces";
import { AuthTokenSchema, Email } from "@/schemas";
import { AuthService } from "@/services";
import UserService from "@/services/UserService";
import { Token } from "@/utils";
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { token } = Object.fromEntries(req.nextUrl.searchParams);

    try {

        if (!AuthTokenSchema.safeParse(token).success) {
            throw new Error(ApiMessage.INVALID_PARAMS);
        }

        const userInfo = await AuthService.verifyVerificationToken(token);
        const cookieData = await AuthService.createSession(userInfo.email as Email, userInfo);

        const userCookie: UserCookie = {
            ...getUserCookie(),
            ...cookieData
        };

        cookies().set(USER_AUTH_COOKIE_KEY, JSON.stringify(userCookie), USER_AUTH_COOKIE_OPTIONS);

        return NextResponse.redirect(new URL('/', req.nextUrl.origin));

    } catch (error: any) {

        // TODO: Redirect to login page with error message
        console.log(error.message);
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));

    }

}