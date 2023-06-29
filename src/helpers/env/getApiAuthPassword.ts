const API_AUTH_PASSWORD: string | undefined = process.env.API_AUTH_PASSWORD;

function getApiAuthPassword() {

    if (!API_AUTH_PASSWORD || API_AUTH_PASSWORD.length === 0) {
        throw new Error("Missing API_AUTH_PASSWORD environment variable");
    }

    return API_AUTH_PASSWORD;
}

export default getApiAuthPassword;