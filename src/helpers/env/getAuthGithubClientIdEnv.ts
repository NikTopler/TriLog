const AUTH_GITHUB_CLIENT_ID = process.env.AUTH_GITHUB_CLIENT_ID;

function getAuthGithubClientIdEnv() {

    if (!AUTH_GITHUB_CLIENT_ID) {
        throw new Error('AUTH_GITHUB_CLIENT_ID environment variable is not defined');
    }

    return AUTH_GITHUB_CLIENT_ID;

}

export default getAuthGithubClientIdEnv;