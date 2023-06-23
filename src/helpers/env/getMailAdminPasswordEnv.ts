const MAIL_ADMIN_PASSWORD = process.env.MAIL_ADMIN_PASSWORD;

function getMailAdminPasswordEnv() {

    if (!MAIL_ADMIN_PASSWORD) {
        throw new Error('Missing MAIL_ADMIN_PASSWORD environment variable');
    }

    return MAIL_ADMIN_PASSWORD;

}

export default getMailAdminPasswordEnv;