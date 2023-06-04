import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const PATHS = {
    AUTH: {
        SOCIAL: {
            GOOGLE: {
                LOGIN: '/api/auth/social/google',
                CALLBACK: '/api/auth/social/google/callback',
            },
            FACEBOOK: {
                LOGIN: '/api/auth/social/facebook',
                CALLBACK: '/api/auth/social/facebook/callback',
            },
            GITHUB: {
                LOGIN: '/api/auth/social/github',
                CALLBACK: '/api/auth/social/github/callback',
            }
        },
        LOGIN: '/api/auth/login',
        EMAIL_VERIFICATION: '/api/auth/email-verification',
    },
};

const AUTH_STATE_TOKEN_LENGTH = 16;
const AUTH_STATE_TOKEN_EXPIRATION = 1000 * 60 * 5;

const AUTH_FACEBOOK_STATE_COOKIE_KEY = 'fb-social-auth-state';
const AUTH_GITHUB_STATE_COOKIE_KEY = 'gh-social-auth-state';

const USER_AUTH_COOKIE_KEY = 'trilog-user_auth';
const USER_AUTH_COOKIE_OPTIONS = {
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30
} as Partial<ResponseCookie>;

const VERIFICATION_TOKEN_LENGTH = 128;

export {
    PATHS,
    AUTH_STATE_TOKEN_LENGTH,
    AUTH_STATE_TOKEN_EXPIRATION,
    AUTH_FACEBOOK_STATE_COOKIE_KEY,
    AUTH_GITHUB_STATE_COOKIE_KEY,
    USER_AUTH_COOKIE_KEY,
    USER_AUTH_COOKIE_OPTIONS,
    VERIFICATION_TOKEN_LENGTH
}