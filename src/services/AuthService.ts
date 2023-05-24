import { Email } from "@/schemas";
import { DatabaseConn } from "@/utils";
import Mailer from "@/utils/Mailer";

class AuthService extends DatabaseConn {

    static async sendVerificationMail(recipient: Email) {

        const tempToken = '1234567890';

        await Mailer.sendMail(
            undefined,
            recipient,
            'Verify your email',
            `Please verify your email by clicking this link: <a href="http://localhost:3000/verify?token=${tempToken}">Verify</a>`,
        );
        
    }

}

export default AuthService;