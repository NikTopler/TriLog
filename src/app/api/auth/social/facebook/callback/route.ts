import { AUTH_FACEBOOK_STATE_COOKIE_KEY, PATHS, USER_AUTH_COOKIE_KEY, USER_AUTH_COOKIE_OPTIONS } from "@/constants";
import { getUserCookie } from "@/helpers/api";
import { getAuthFacebookAppIdEnv, getAuthFacebookAppSecretEnv } from "@/helpers/env";
import { UserCookie } from "@/interfaces";
import { Email } from "@/schemas";
import { AuthService } from "@/services";
import UserService from "@/services/UserService";
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { code, state } = Object.fromEntries(req.nextUrl.searchParams);

    try {

        if (!code || !state) {
            throw new Error("Did not receive code or state from Facebook", {
                cause: "User did not grant access to their Facebook account"
            });
        }

        const fbState = cookies().get(AUTH_FACEBOOK_STATE_COOKIE_KEY);

        if (!fbState || fbState.value !== state) {
            throw new Error("State mismatch");
        }

        const { access_token } = await AuthService.getFacebookAccessToken(
            getAuthFacebookAppIdEnv(),
            process.env.APP_URL + PATHS.AUTH.SOCIAL.FACEBOOK.CALLBACK,
            getAuthFacebookAppSecretEnv(),
            code
        );

        const { 
            id, 
            email, 
            picture 
        } = await AuthService.getFacebookUserData(access_token);

        let user = await UserService.getByEmail(email);

        // TODO: Upload profile image to server

        if (user) {

            if (user.facebookID && user.facebookID !== id) {
                throw new Error("Facebook ID mismatch");
            }

            if (!user.facebookID) {

                await UserService.update(email as Email, {
                    isVerified: true,
                    profileImageUrl: null,
                    facebookID: id
                });

            }

        } else {

            user = await UserService.createThroughSocial(email as Email, {
                profileImageUrl: null,
                facebookID: id
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

    } finally {
        cookies().delete(AUTH_FACEBOOK_STATE_COOKIE_KEY);
    }

}