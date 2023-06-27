import { ACCESS_TOKEN_EXPIRATION_SECONDS, REFRESH_TOKEN_EXPIRATION_SECONDS } from "@/constants";
import { getCurrentTimestamp } from "@/helpers";
import { getAuthAccessTokenEncryptionSecretEnv, getAuthAccessTokenSecretEnv, getAuthRefreshTokenEncryptionSecretEnv, getAuthRefreshTokenSecretEnv } from "@/helpers/env";
import { AccessTokenData, RefreshTokenData } from "@/types";
import { SignJWT, jwtVerify, decodeJwt, EncryptJWT, jwtDecrypt } from "jose";

export interface TokenDecryptObj {
    payload: {
        token: string;
    };
    protectedHeader: {
        alg: string;
        enc: string;
    }
}

const alg = 'HS256';

class Token {

    static generate(payload: any, expiresAt: number, secret: string) {
        return new SignJWT(payload)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime(expiresAt)
            .sign(new TextEncoder().encode(secret));
    }

    static verify(token: string, secret: string) {
        return jwtVerify(token, new TextEncoder().encode(secret));
    }

    static decode<T>(token: string) {
        return decodeJwt(token) as T;
    }

    static encrypt(token: string, secret: string) {
        return new EncryptJWT({ token })
            .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
            .setIssuedAt()
            .encrypt(new TextEncoder().encode(secret));
    }

    static decrypt(token: string, secret: string) {
        return jwtDecrypt(token, new TextEncoder().encode(secret));
    }

    static generateRefreshToken(data: RefreshTokenData, expSeconds = REFRESH_TOKEN_EXPIRATION_SECONDS) {
        return this.generate(data, getCurrentTimestamp(true) + expSeconds, getAuthRefreshTokenSecretEnv());
    }

    static generateAccessToken(data: AccessTokenData, expSeconds = ACCESS_TOKEN_EXPIRATION_SECONDS) {
        return this.generate(data, getCurrentTimestamp(true) + expSeconds, getAuthAccessTokenSecretEnv());
    }

    static async generateAndEncryptAuthTokens({ email, role }: AccessTokenData & RefreshTokenData, refreshTokenExpSeconds?: number) {

        const [refreshToken, accessToken] = await Promise.all([
            this.generateRefreshToken({ email }, refreshTokenExpSeconds),
            this.generateAccessToken({ email, role })
        ]);

        const [encryptedRefreshToken, encryptedAccessToken] = await Promise.all([
            this.encrypt(refreshToken, getAuthRefreshTokenEncryptionSecretEnv()),
            this.encrypt(accessToken, getAuthAccessTokenEncryptionSecretEnv())
        ]);

        return {
            refreshToken,
            accessToken,
            encryptedRefreshToken,
            encryptedAccessToken
        }

    }

}

export default Token;