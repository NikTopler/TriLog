import { ApiMessage } from "@/constants";
import { AuthError } from "@/errors";
import { getCurrentTimestamp } from "@/helpers";
import { getUserCookie } from "@/helpers/api";
import { getAuthAccessTokenEncryptionSecretEnv, getAuthAccessTokenSecretEnv, getAuthRefreshTokenEncryptionSecretEnv, getAuthRefreshTokenSecretEnv } from "@/helpers/env";
import { AccessTokenData, RefreshTokenData, UserCookie } from "@/interfaces";
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

    let userStatus = UserAuthStatus.UNAUTHENTICATED;
    let userCookie: UserCookie = getUserCookie(req);

    let decryptedRefreshToken: string | null = null;
    let decryptedAccessToken: string | null = null;

    if (userCookie.accessToken && userCookie.refreshToken) {

        const [decryptedRefreshPayload, decryptedAccessPayload] = await Promise.all([
            Token.decrypt(userCookie.refreshToken, getAuthRefreshTokenEncryptionSecretEnv()) as Promise<TokenDecryptObj>,
            Token.decrypt(userCookie.accessToken, getAuthAccessTokenEncryptionSecretEnv()) as Promise<TokenDecryptObj>
        ]);

        userStatus = await getUserAuthStatus(decryptedRefreshPayload.payload.token as string, decryptedAccessPayload.payload.token as string);
        decryptedRefreshToken = decryptedRefreshPayload.payload.token;
        decryptedAccessToken = decryptedAccessPayload.payload.token;

    }

    switch (userStatus) {

        case UserAuthStatus.AUTHENTICATED: {

            userCookie.authenticated = true;

            if (req.nextUrl.pathname.startsWith('/auth')) {
                throw new AuthError("Access denied!", req.nextUrl.origin);
            }

            break;
        }

        case UserAuthStatus.UNAUTHENTICATED: {

            userCookie.authenticated = false;
            userCookie.accessToken = null;
            userCookie.refreshToken = null;

            if (!req.nextUrl.pathname.startsWith('/auth')) {
                throw new AuthError("Access denied!", req.nextUrl.origin + '/auth/login');
            }

            break;
        }

        case UserAuthStatus.EXPIRED: {

            userCookie.authenticated = true;

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

                userCookie.accessToken = encryptedAccessToken;
                userCookie.refreshToken = encryptedRefreshToken;

            } catch (error: any) {

                //TODO: check type of error
                throw new AuthError(ApiMessage.AUTH_ERROR);
            }

            break;
        }

    }

    return userCookie;
}

export default userAuthMiddleware;