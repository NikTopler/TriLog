const MAIL_ADMIN_EMAIL = process.env.MAIL_ADMIN_EMAIL;

function getMailAdminEmail() {

    if (!MAIL_ADMIN_EMAIL) {
        throw new Error('Missing MAIL_ADMIN_EMAIL environment variable');
    }

    return MAIL_ADMIN_EMAIL;

}

export default getMailAdminEmail;