const AUTH_GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_CLIENT_ID;

function getAuthGoogleClientIdEnv() {

    if (!AUTH_GOOGLE_CLIENT_ID) {
        throw new Error('Missing AUTH_GOOGLE_CLIENT_ID environment variable');
    }

    return AUTH_GOOGLE_CLIENT_ID;

}

export default getAuthGoogleClientIdEnv;