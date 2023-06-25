import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const VERIFICATION_TOKEN_LENGTH = 128;

const AUTH_STATE_TOKEN_LENGTH = 16;
const AUTH_STATE_TOKEN_EXPIRATION = 1000 * 60 * 5;

const ACCESS_TOKEN_EXPIRATION_SECONDS = 2 * 60;
const REFRESH_TOKEN_EXPIRATION_SECONDS = (5 * 24 * 60 * 60);

const AUTH_FACEBOOK_STATE_COOKIE_KEY = 'trilog-fb_social_auth_state';
const AUTH_GITHUB_STATE_COOKIE_KEY = 'trilog-gh_social_auth_state';

const AUTH_COOKIE_KEY = 'trilog-user_auth';
const AUTH_COOKIE_OPTIONS = {
    secure: true,
    path: '/',
    sameSite: 'none', // TODO: experiment with "lax"
    maxAge: REFRESH_TOKEN_EXPIRATION_SECONDS
} as Partial<ResponseCookie>;

const TRIATHLON_TYPES_LOCAL_STORAGE_KEY = "trilog-triathlon-types";
const TRIATHLON_CATEGORIES_LOCAL_STORAGE_KEY = "trilog-triathlon-categories";
const ORGANIZATIONS_LOCAL_STORAGE_KEY = "trilog-organizations";

export {
    AUTH_STATE_TOKEN_LENGTH,
    AUTH_STATE_TOKEN_EXPIRATION,
    AUTH_FACEBOOK_STATE_COOKIE_KEY,
    AUTH_GITHUB_STATE_COOKIE_KEY,
    ACCESS_TOKEN_EXPIRATION_SECONDS,
    REFRESH_TOKEN_EXPIRATION_SECONDS,
    AUTH_COOKIE_KEY,
    AUTH_COOKIE_OPTIONS,
    VERIFICATION_TOKEN_LENGTH,
    ORGANIZATIONS_LOCAL_STORAGE_KEY,
    TRIATHLON_TYPES_LOCAL_STORAGE_KEY,
    TRIATHLON_CATEGORIES_LOCAL_STORAGE_KEY
}