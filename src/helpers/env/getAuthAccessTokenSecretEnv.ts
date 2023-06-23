const AUTH_ACCESS_TOKEN_SECRET = process.env.AUTH_ACCESS_TOKEN_SECRET;

function getAuthAccessTokenSecretEnv() {

    if (!AUTH_ACCESS_TOKEN_SECRET || AUTH_ACCESS_TOKEN_SECRET.length === 0) {
        throw new Error("Missing AUTH_ACCESS_TOKEN_SECRET environment variable");
    }

    return AUTH_ACCESS_TOKEN_SECRET;

}

export default getAuthAccessTokenSecretEnv;