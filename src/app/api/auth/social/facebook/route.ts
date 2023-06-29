import { AUTH_FACEBOOK_STATE_COOKIE_KEY, AUTH_STATE_TOKEN_EXPIRATION, AUTH_STATE_TOKEN_LENGTH, PATHS } from "@/constants";
import { generateToken } from "@/helpers";
import { getAuthFacebookAppIdEnv } from "@/helpers/env";
import { NextResponse } from "next/server";

export async function GET() {

    const appId = getAuthFacebookAppIdEnv();
    const redirectUri = process.env.APP_URL + PATHS.api.auth.social.facebook.callback;
    const state = generateToken(AUTH_STATE_TOKEN_LENGTH);

    return NextResponse.redirect(`https://www.facebook.com/v17.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${state}`, {
        headers: {
            'Set-Cookie': `${AUTH_FACEBOOK_STATE_COOKIE_KEY}=${state}; Path=${PATHS.api.auth.social.facebook.login}; HttpOnly;${process.env.PRODUCTION ? ' Secure; ' : ' '}SameSite=Strict; Expires=${new Date(Date.now() + AUTH_STATE_TOKEN_EXPIRATION).toUTCString()}`
        }
    });

}