const AUTH_GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_CLIENT_SECRET;

function getAuthGoogleClientSecretEnv() {

    if (!AUTH_GOOGLE_CLIENT_SECRET) {
        throw new Error('Missing AUTH_GOOGLE_CLIENT_SECRET environment variable');
    }

    return AUTH_GOOGLE_CLIENT_SECRET;

}

export default getAuthGoogleClientSecretEnv;