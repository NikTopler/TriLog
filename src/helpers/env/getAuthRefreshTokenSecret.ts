const AUTH_REFRESH_TOKEN_SECRET = process.env.AUTH_REFRESH_TOKEN_SECRET;

function getAuthRefreshTokenSecretEnv() {

    if (!AUTH_REFRESH_TOKEN_SECRET || AUTH_REFRESH_TOKEN_SECRET.length === 0) {
        throw new Error("Missing AUTH_REFRESH_TOKEN_SECRET environment variable");
    }

    return AUTH_REFRESH_TOKEN_SECRET;

}

export default getAuthRefreshTokenSecretEnv;