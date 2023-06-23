const AUTH_GITHUB_CLIENT_SECRET = process.env.AUTH_GITHUB_CLIENT_SECRET;

function getAuthGithubClientSecretEnv() {

    if (!AUTH_GITHUB_CLIENT_SECRET) {
        throw new Error('AUTH_GITHUB_CLIENT_SECRET environment variable is not defined');
    }

    return AUTH_GITHUB_CLIENT_SECRET;

}

export default getAuthGithubClientSecretEnv;