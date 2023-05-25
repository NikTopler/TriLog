import { Email } from "@/schemas";
import { Mailer } from "@/utils";
import BaseService from "./BaseService";

class AuthService extends BaseService {

    static async sendVerificationMail(
        recipient: Email,
        code: string,
        isVerified: boolean,
        origin: string = 'http://localhost:3000'
    ) {

        // TODO: create a templates

        let title = 'Verify your email';
        let content = `Verification code: ${code}`;

        if (isVerified) {
            title = 'Login link';
            content = `Your login link: <a href="${origin}/api/auth?token=${code}">Login</a>`;
        }

        await Mailer.sendMail(
            undefined,
            recipient,
            title,
            content
        );

    }

}

export default AuthService;