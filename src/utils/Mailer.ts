import { getMailAdminEmail, getMailAdminPasswordEnv, getMailHostEnv } from "@/helpers/env";
import nodemailer from "nodemailer";

class Mailer {

    static async sendMail(
        from: string,
        to: string,
        subject: string,
        html: string
    ) {

        const transporter = nodemailer.createTransport({
            host: getMailHostEnv(),
            secure: true,
            auth: {
                user: getMailAdminEmail(),
                pass: getMailAdminPasswordEnv()
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