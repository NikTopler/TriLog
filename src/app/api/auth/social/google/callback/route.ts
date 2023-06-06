import { USER_AUTH_COOKIE_KEY, USER_AUTH_COOKIE_OPTIONS } from "@/constants";
import { getUserCookie } from "@/helpers/api";
import { UserCookie } from "@/interfaces";
import { AuthService } from "@/services";
import UserService from "@/services/UserService";
import { cookies } from "next/dist/client/components/headers";
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

        let user = await UserService.getByEmail(email);

        // TODO: Upload profile image to server

        if (user) {

            if (user.googleID && user.googleID !== id) {
                throw new Error("Google ID mismatch");
            }

            if (!user.googleID) {

                await UserService.update(email, {
                    isVerified: true,
                    profileImageUrl: null,
                    googleID: id
                });

            }

        } else {

            user = await UserService.createThroughSocial(email, {
                profileImageUrl: null,
                googleID: id
            });

        }

        const cookieData = await AuthService.createSession(email, user);

        const userCookie: UserCookie = {
            ...getUserCookie(),
            ...cookieData
        };

        cookies().set(USER_AUTH_COOKIE_KEY, JSON.stringify(userCookie), USER_AUTH_COOKIE_OPTIONS);

        return NextResponse.redirect(new URL('/', req.nextUrl.origin));

    } catch (error: any) {

        console.log(error.message);

        // TODO: Redirect to login page with error message
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));
    }

}