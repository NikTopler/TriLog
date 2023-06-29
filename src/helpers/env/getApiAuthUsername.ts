const API_AUTH_USERNAME: string | undefined = process.env.API_AUTH_USERNAME;

function getApiAuthUsername() {

    if (!API_AUTH_USERNAME || API_AUTH_USERNAME.length === 0) {
        throw new Error("Missing API_AUTH_USERNAME environment variable");
    }

    return API_AUTH_USERNAME;
}

export default getApiAuthUsername;