import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const USER_AUTH_LOCAL_STORAGE_KEY = 'trilog-user_auth';

const AUTH_STATE_TOKEN_LENGTH = 16;
const AUTH_STATE_TOKEN_EXPIRATION = 1000 * 60 * 5;

const AUTH_FACEBOOK_STATE_COOKIE_KEY = 'fb-social-auth-state';
const AUTH_GITHUB_STATE_COOKIE_KEY = 'gh-social-auth-state';

const ACCESS_TOKEN_EXPIRATION_SECONDS = 2 * 60;
const REFRESH_TOKEN_EXPIRATION_SECONDS = (5 * 24 * 60 * 60);

const USER_AUTH_COOKIE_KEY = 'trilog-user_auth';
const USER_AUTH_COOKIE_OPTIONS = {
    secure: true,
    path: '/',
    sameSite: 'none', // TODO: experiment with "lax"
    maxAge: REFRESH_TOKEN_EXPIRATION_SECONDS
} as Partial<ResponseCookie>;

const VERIFICATION_TOKEN_LENGTH = 128;

export {
    USER_AUTH_LOCAL_STORAGE_KEY,
    AUTH_STATE_TOKEN_LENGTH,
    AUTH_STATE_TOKEN_EXPIRATION,
    AUTH_FACEBOOK_STATE_COOKIE_KEY,
    AUTH_GITHUB_STATE_COOKIE_KEY,
    ACCESS_TOKEN_EXPIRATION_SECONDS,
    REFRESH_TOKEN_EXPIRATION_SECONDS,
    USER_AUTH_COOKIE_KEY,
    USER_AUTH_COOKIE_OPTIONS,
    VERIFICATION_TOKEN_LENGTH
}