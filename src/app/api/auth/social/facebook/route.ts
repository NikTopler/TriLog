import { AUTH_FACEBOOK_STATE_COOKIE_KEY, PATHS } from "@/constants";
import { generateToken } from "@/helpers";
import { NextResponse } from "next/server";

const STATE_TOKEN_LENGTH = 16;
const STATE_TOKEN_EXPIRATION = 20 * 1000;

export async function GET() {

    const appId = process.env.AUTH_FACEBOOK_APP_ID;
    const redirectUri = process.env.APP_URL + PATHS.AUTH.SOCIAL.FACEBOOK.CALLBACK;
    const state = generateToken(STATE_TOKEN_LENGTH);

    return NextResponse.redirect(`https://www.facebook.com/v17.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${state}`, {
        headers: {
            'Set-Cookie': `${AUTH_FACEBOOK_STATE_COOKIE_KEY}=${state}; Path=${PATHS.AUTH.SOCIAL.FACEBOOK}; HttpOnly;${process.env.PRODUCTION ? ' Secure; ' : ' '}SameSite=Strict; Expires=${new Date(Date.now() + STATE_TOKEN_EXPIRATION).toUTCString()}`
        }
    });

}