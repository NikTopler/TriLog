import { AUTH_GITHUB_STATE_COOKIE_KEY, USER_AUTH_COOKIE_KEY, USER_AUTH_COOKIE_OPTIONS } from "@/constants";
import { getUserCookie } from "@/helpers/api";
import { getAuthGithubClientIdEnv, getAuthGithubClientSecretEnv } from "@/helpers/env";
import { UserCookie } from "@/interfaces";
import { AuthService } from "@/services";
import UserService from "@/services/UserService";
import { cookies } from "next/dist/client/components/headers";
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

        // TODO: Upload profile image to server

        let user = await UserService.getByEmail(email);

        if (user) {

            if (user.githubID && user.githubID !== id) {
                throw new Error("Github ID mismatch");
            }

            if (!user.githubID) {

                await UserService.update(email, {
                    isVerified: true,
                    profileImageUrl: null,
                    githubID: id
                });

            }

        } else {

            user = await UserService.createThroughSocial(email, {
                profileImageUrl: null,
                githubID: id
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
        cookies().delete(AUTH_GITHUB_STATE_COOKIE_KEY);
    }

}