import { AUTH_GITHUB_STATE_COOKIE_KEY, AUTH_STATE_TOKEN_EXPIRATION, AUTH_STATE_TOKEN_LENGTH, PATHS } from "@/constants";
import { generateToken } from "@/helpers";
import { getAuthGithubClientIdEnv } from "@/helpers/env";
import { NextResponse } from "next/server";

export async function GET() {

    const clientId = getAuthGithubClientIdEnv();
    const redirectUri = process.env.APP_URL + PATHS.AUTH.SOCIAL.GITHUB.CALLBACK;
    const state = generateToken(AUTH_STATE_TOKEN_LENGTH);
    const scope = 'user';

    return NextResponse.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`, {
        headers: {
            'Set-Cookie': `${AUTH_GITHUB_STATE_COOKIE_KEY}=${state}; Path=${PATHS.AUTH.SOCIAL.GITHUB}; HttpOnly;${process.env.PRODUCTION ? ' Secure; ' : ' '} Expires=${new Date(Date.now() + AUTH_STATE_TOKEN_EXPIRATION).toUTCString()}`
        }
    });

}