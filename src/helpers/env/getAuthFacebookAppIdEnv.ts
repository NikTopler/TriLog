const AUTH_FACEBOOK_APP_ID = process.env.AUTH_FACEBOOK_APP_ID;

function getAuthFacebookAppIdEnv() {

    if (!AUTH_FACEBOOK_APP_ID) {
        throw new Error('Missing AUTH_FACEBOOK_APP_ID environment variable');
    }

    return AUTH_FACEBOOK_APP_ID;

}

export default getAuthFacebookAppIdEnv; 