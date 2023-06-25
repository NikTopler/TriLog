import Token from "@/utils/Token";
import { getAuthAccessTokenSecretEnv, getAuthRefreshTokenSecretEnv } from "../env";
import { AuthCookie } from "@/interfaces";

export enum UserAuthStatus {
    AUTHENTICATED,
    UNAUTHENTICATED,
    EXPIRED
}

async function userAuth(authCookie: AuthCookie) {

    const { accessToken, refreshToken } = authCookie;

    if (!accessToken || !refreshToken) {
        return UserAuthStatus.UNAUTHENTICATED;
    }

    return await Promise.allSettled([
        Token.verify(accessToken, getAuthAccessTokenSecretEnv()),
        Token.verify(refreshToken, getAuthRefreshTokenSecretEnv())
    ]).then(([accessPayload, refreshPayload]) => {

        const isAccessPayloadValid = accessPayload.status === 'fulfilled';
        const isRefreshPayloadValid = refreshPayload.status === 'fulfilled';

        if (isAccessPayloadValid && isRefreshPayloadValid) {
            return UserAuthStatus.AUTHENTICATED;
        }

        if (!isRefreshPayloadValid) {
            return UserAuthStatus.UNAUTHENTICATED;
        }

        return UserAuthStatus.EXPIRED;

    });

}

export default userAuth;