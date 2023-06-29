import { ApiMessage } from "@/constants";
import { AuthError } from "@/errors";
import { getCurrentTimestamp } from "@/helpers";
import { getAuthCookie } from "@/helpers/api";
import { getAuthAccessTokenEncryptionSecretEnv, getAuthAccessTokenSecretEnv, getAuthRefreshTokenEncryptionSecretEnv, getAuthRefreshTokenSecretEnv } from "@/helpers/env";
import { AccessTokenData, AuthCookie, RefreshTokenData } from "@/types";
import Token, { TokenDecryptObj } from "@/utils/Token";
import { NextRequest } from "next/server";

export enum UserAuthStatus {
    AUTHENTICATED,
    UNAUTHENTICATED,
    EXPIRED
}

function getUserAuthStatus(refreshToken: string, accessToken: string) {

    return Promise.allSettled([
        Token.verify(refreshToken, getAuthRefreshTokenSecretEnv()),
        Token.verify(accessToken, getAuthAccessTokenSecretEnv())
    ]).then(([refreshPayload, accessPayload]) => {

        const isRefreshPayloadValid = refreshPayload.status === 'fulfilled';
        const isAccessPayloadValid = accessPayload.status === 'fulfilled';

        if (isAccessPayloadValid && isRefreshPayloadValid) {
            return UserAuthStatus.AUTHENTICATED;
        }

        if (!isRefreshPayloadValid) {
            return UserAuthStatus.UNAUTHENTICATED;
        }

        return UserAuthStatus.EXPIRED;

    });

}

async function userAuthMiddleware(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith('/api')) {
        return false;
    }

    let userStatus = UserAuthStatus.UNAUTHENTICATED;
    let authCookie: AuthCookie = getAuthCookie(req);

    let decryptedRefreshToken: string | null = null;
    let decryptedAccessToken: string | null = null;

    if (authCookie.accessToken && authCookie.refreshToken) {

        const [decryptedRefreshPayload, decryptedAccessPayload] = await Promise.all([
            Token.decrypt(authCookie.refreshToken, getAuthRefreshTokenEncryptionSecretEnv()) as Promise<TokenDecryptObj>,
            Token.decrypt(authCookie.accessToken, getAuthAccessTokenEncryptionSecretEnv()) as Promise<TokenDecryptObj>
        ]);

        userStatus = await getUserAuthStatus(decryptedRefreshPayload.payload.token as string, decryptedAccessPayload.payload.token as string);
        decryptedRefreshToken = decryptedRefreshPayload.payload.token;
        decryptedAccessToken = decryptedAccessPayload.payload.token;

    }

    switch (userStatus) {

        case UserAuthStatus.AUTHENTICATED: {

            authCookie.authenticated = true;

            if (req.nextUrl.pathname.startsWith('/auth')) {
                throw new AuthError("Access denied!", req.nextUrl.origin);
            }

            break;
        }

        case UserAuthStatus.UNAUTHENTICATED: {

            authCookie.authenticated = false;
            authCookie.accessToken = null;
            authCookie.refreshToken = null;

            if (!req.nextUrl.pathname.startsWith('/auth')) {
                throw new AuthError("Access denied!", req.nextUrl.origin + '/auth/login');
            }

            break;
        }

        case UserAuthStatus.EXPIRED: {

            authCookie.authenticated = true;

            try {

                if (!decryptedRefreshToken || !decryptedAccessToken) {
                    throw new Error("Something went wrong!");
                }

                const currentTimeSeconds = getCurrentTimestamp(true);
                const tokenData = Token.decode<AccessTokenData>(decryptedAccessToken);
                const { exp } = Token.decode<RefreshTokenData>(decryptedRefreshToken);

                if (!exp) {
                    throw new Error("Something went wrong!");
                }

                const { encryptedRefreshToken, encryptedAccessToken } = await Token.generateAndEncryptAuthTokens(tokenData, exp - currentTimeSeconds);

                authCookie.accessToken = encryptedAccessToken;
                authCookie.refreshToken = encryptedRefreshToken;

            } catch (error: any) {

                //TODO: check type of error
                throw new AuthError(ApiMessage.AUTH_ERROR);
            }

            break;
        }

    }

    return authCookie;
}

export default userAuthMiddleware;