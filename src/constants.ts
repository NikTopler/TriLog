import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const USER_AUTH_COOKIE_KEY = 'trilog-user_auth';
const USER_AUTH_COOKIE_OPTIONS = {
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30
} as Partial<ResponseCookie>;

const VERIFICATION_TOKEN_LENGTH = 128;

export {
    USER_AUTH_COOKIE_KEY,
    USER_AUTH_COOKIE_OPTIONS,
    VERIFICATION_TOKEN_LENGTH
}