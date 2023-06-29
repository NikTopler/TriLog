import { AUTH_COOKIE_KEY, AUTH_COOKIE_OPTIONS, AUTH_GITHUB_STATE_COOKIE_KEY, PATHS } from "@/constants";
import { isEmail } from "@/helpers";
import { getAuthCookie } from "@/helpers/api";
import { getAuthGithubClientIdEnv, getAuthGithubClientSecretEnv } from "@/helpers/env";
import { AuthService } from "@/services";
import { UserService } from "@/services";
import { AuthCookie } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { code, state } = Object.fromEntries(req.nextUrl.searchParams);

    try {

        if (!code || !state) {
            throw new Error("Did not receive code or state from Github", {
                cause: "User did not grant access to their Github account"
            });
        }

        const ghState = cookies().get(AUTH_GITHUB_STATE_COOKIE_KEY);

        if (!ghState || ghState.value !== state) {
            throw new Error("State mismatch");
        }

        const { access_token } = await AuthService.getGithubAccessToken(
            getAuthGithubClientIdEnv(),
            getAuthGithubClientSecretEnv(),
            code,
        );

        const {
            id,
            email,
            avatar_url
        } = await AuthService.getGithubUserData(access_token);

        if(!isEmail(email)) {
            throw new Error("Could not get email from Github");
        }

        // TODO: Upload profile image to server

        let userInfo = await UserService.getByEmail(email);

        if (userInfo) {

            if (userInfo.githubID && userInfo.githubID !== id) {
                throw new Error("Github ID mismatch");
            }

            if (!userInfo.githubID) {

                await UserService.update(email, {
                    isVerified: true,
                    profileImageUrl: null,
                    githubID: id
                });

            }

        } else {

            userInfo = await UserService.createThroughSocial(email, {
                profileImageUrl: null,
                githubID: id
            });

        }

        const cookieData = await AuthService.createSession(email, userInfo);

        const authCookie: AuthCookie = {
            ...getAuthCookie(),
            ...cookieData
        };

        cookies().set(
            AUTH_COOKIE_KEY,
            JSON.stringify(authCookie),
            AUTH_COOKIE_OPTIONS
        );

        return NextResponse.redirect(req.nextUrl.origin);


    } catch (error: any) {

        console.log(error.message);

        // TODO: Redirect to login page with error message
        return NextResponse.redirect(req.nextUrl.origin + PATHS.auth.login);

    } finally {
        cookies().delete(AUTH_GITHUB_STATE_COOKIE_KEY);
    }

}