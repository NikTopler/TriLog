import { ApiMessage, USER_AUTH_COOKIE_KEY, USER_AUTH_COOKIE_OPTIONS } from "@/constants";
import { getUserCookie } from "@/helpers/api";
import { ApiResponse, UserCookie } from "@/interfaces";
import { AuthService } from "@/services";
import { UserService } from "@/services";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, verificationCode } = await req.json();

    try {

        if (!email || !verificationCode) {
            throw new Error(ApiMessage.INVALID_PARAMS);
        }

        const userInfo = await AuthService.verifyVerificationCode(email, verificationCode)

        // TODO: optimize this
        await UserService.updateUserVerificationStatus(email);
        const cookieData = await AuthService.createSession(email, userInfo);

        const userCookie: UserCookie = {
            ...getUserCookie(),
            ...cookieData
        };

        cookies().set(
            USER_AUTH_COOKIE_KEY,
            JSON.stringify(userCookie),
            USER_AUTH_COOKIE_OPTIONS
        );

        const res: ApiResponse<never> = {
            success: true,
            message: ApiMessage.EMAIL_VERIFIED
        }

        return NextResponse.json(res, { status: 200 });

    } catch (error: any) {

        const res: ApiResponse<never> = {
            success: false,
            message: ApiMessage.EMAIL_VERIFIED_ERROR,
            errors: error.message
        };

        return NextResponse.json(res, { status: 400 });

    }

}