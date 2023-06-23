const MAIL_HOST: string | undefined = process.env.MAIL_HOST;

function getMailHostEnv() {

    if (!MAIL_HOST || MAIL_HOST.length === 0) {
        throw new Error("Missing DB_PORT environment variable");
    }

    return MAIL_HOST;
}

export default getMailHostEnv;