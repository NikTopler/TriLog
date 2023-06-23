const AUTH_REFRESH_TOKEN_ENCRYPTION_SECRET = process.env.AUTH_REFRESH_TOKEN_ENCRYPTION_SECRET;

function getAuthRefreshTokenEncryptionSecretEnv() {

    if (!AUTH_REFRESH_TOKEN_ENCRYPTION_SECRET || AUTH_REFRESH_TOKEN_ENCRYPTION_SECRET.length === 0) {
        throw new Error("Missing AUTH_REFRESH_TOKEN_ENCRYPTION_SECRET environment variable");
    }

    return AUTH_REFRESH_TOKEN_ENCRYPTION_SECRET;

}

export default getAuthRefreshTokenEncryptionSecretEnv;