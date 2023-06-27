import { USER_AUTH_COOKIE_KEY, USER_AUTH_COOKIE_OPTIONS } from "@/constants";
import { isEmail } from "@/helpers";
import { getUserCookie } from "@/helpers/api";
import { UserCookie } from "@/types";
import { AuthService } from "@/services";
import { UserService } from "@/services";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { code } = Object.fromEntries(req.nextUrl.searchParams);

    try {

        if (!code) {
            throw new Error("Did not receive code from Google", {
                cause: "User did not grant access to their Google account"
            });
        }

        const { tokens: { id_token, access_token } } = await AuthService.oauth2Client.getToken(code);

        if (!id_token || !access_token) {
            throw new Error("Did not receive tokens from Google", {
                cause: "User did not grant access to their Google account"
            });
        }

        const {
            id,
            email,
            picture,
        } = await AuthService.getGoogleUserData(id_token, access_token);

        if(!isEmail(email)) {
            throw new Error("Could not get email from Google");
        }

        let userInfo = await UserService.getByEmail(email);

        // TODO: Upload profile image to server

        if (userInfo) {

            if (userInfo.googleID && userInfo.googleID !== id) {
                throw new Error("Google ID mismatch");
            }

            if (!userInfo.googleID) {

                await UserService.update(email, {
                    isVerified: true,
                    profileImageUrl: null,
                    googleID: id
                });

            }

        } else {

            userInfo = await UserService.createThroughSocial(email, {
                profileImageUrl: null,
                googleID: id
            });

        }

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

        return NextResponse.redirect(req.nextUrl.origin);

    } catch (error: any) {

        console.log(error.message);

        // TODO: Redirect to login page with error message
        return NextResponse.redirect(req.nextUrl.origin + '/auth/login');
    }

}