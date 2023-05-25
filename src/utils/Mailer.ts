import nodemailer from 'nodemailer';

class Mailer {

    static async sendMail(from: string = process.env.MAIL_ADMIN_EMAIL!, to: string, subject: string, html: string) {

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secure: true,
            auth: {
                user: process.env.MAIL_ADMIN_EMAIL,
                pass: process.env.MAIL_ADMIN_PASSWORD
            },
        });

        await transporter.sendMail({
            from,
            to,
            subject,
            html,
        });

    }

}

export default Mailer;