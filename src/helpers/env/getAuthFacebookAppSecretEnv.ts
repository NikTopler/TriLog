const AUTH_FACEBOOK_APP_SECRET = process.env.AUTH_FACEBOOK_APP_SECRET;

function getAuthFacebookAppSecretEnv() {

    if (!AUTH_FACEBOOK_APP_SECRET) {
        throw new Error('AUTH_FACEBOOK_APP_SECRET environment variable is not defined');
    }

    return AUTH_FACEBOOK_APP_SECRET;

}

export default getAuthFacebookAppSecretEnv;