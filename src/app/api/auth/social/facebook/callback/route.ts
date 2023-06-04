import { AUTH_FACEBOOK_STATE_COOKIE_KEY, PATHS } from "@/constants";
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

        cookies().delete(AUTH_FACEBOOK_STATE_COOKIE_KEY);

        const { access_token } = await AuthService.getFacebookAccessToken(
            process.env.AUTH_FACEBOOK_APP_ID || '',
            process.env.APP_URL + PATHS.AUTH.SOCIAL.FACEBOOK.CALLBACK,
            process.env.AUTH_FACEBOOK_APP_SECRET || '',
            code
        );

        const { id, email, picture } = await AuthService.getFacebookUserData(access_token);

        let user = await UserService.getByEmail(email as Email);

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

        return NextResponse.json(user);

    } catch (error: any) {

        console.log(error.message);

        // TODO: Redirect to login page with error message
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));
    }

}