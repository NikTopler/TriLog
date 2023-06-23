const AUTH_ACCESS_TOKEN_ENCRYPTION_SECRET = process.env.AUTH_ACCESS_TOKEN_ENCRYPTION_SECRET;

function getAuthAccessTokenEncryptionSecretEnv() {

    if (!AUTH_ACCESS_TOKEN_ENCRYPTION_SECRET || AUTH_ACCESS_TOKEN_ENCRYPTION_SECRET.length === 0) {
        throw new Error("Missing AUTH_ACCESS_TOKEN_ENCRYPTION_SECRET environment variable");
    }

    return AUTH_ACCESS_TOKEN_ENCRYPTION_SECRET;

}

export default getAuthAccessTokenEncryptionSecretEnv;