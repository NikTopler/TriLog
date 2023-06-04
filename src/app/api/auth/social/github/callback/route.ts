import { AUTH_GITHUB_STATE_COOKIE_KEY } from "@/constants";
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
            process.env.AUTH_GITHUB_CLIENT_ID || '',
            process.env.AUTH_GITHUB_CLIENT_SECRET || '',
            code,
        );

        const { id, email, avatar_url } = await AuthService.getGithubUserData(access_token);

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

        return NextResponse.json(user);

    } catch (error: any) {

        console.log(error.message);

        // TODO: Redirect to login page with error message
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));

    } finally {
        cookies().delete(AUTH_GITHUB_STATE_COOKIE_KEY);
    }

}