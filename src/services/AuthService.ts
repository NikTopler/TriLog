import { Email } from "@/schemas";
import { Mailer } from "@/utils";
import BaseService from "./BaseService";
import { google } from "googleapis";
import axios from "axios";
import { GoogleAuthUserInfo } from "@/interfaces";
import UserService from "./UserService";

class AuthService extends BaseService {

    static oauth2Client = new google.auth.OAuth2(
        process.env.AUTH_GOOGLE_CLIENT_ID,
        process.env.AUTH_GOOGLE_CLIENT_SECRET,
        process.env.AUTH_GOOGLE_REDIRECT_URL
    );

    static getGoogleUserData(tokenID: string, accessToken: string) {

        return axios.get<GoogleAuthUserInfo>('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken, {
            headers: {
                Authorization: `Bearer ${tokenID}`
            }
        }).then(({ data }) => {

            if(data) {
                return data;
            }

            throw new Error("Did not receive user data from Google", {
                cause: "User did not grant access to their Google account"
            });

        });

    }

    static async verifyVerificationCode(email: Email, userCode: string) {

        const user = await UserService.getByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.verificationCode || !user.verificationCodeExpiresAt) {
            throw new Error("Something went wrong");
        }

        if (user.verificationCode !== userCode) {
            throw new Error("Invalid verification code");
        }

        if (user.verificationCodeExpiresAt < new Date()) {
            throw new Error("Verification code expired");
        }

        return user;

    }

    static async verifiyVerificationToken(userToken: string) {

        const user = await UserService.getByVerificationToken(userToken);

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.verificationToken || !user.verificationTokenExpiresAt) {
            throw new Error("Something went wrong");
        }

        if (user.verificationToken !== userToken) {
            throw new Error("Invalid verification token");
        }

        if (user.verificationTokenExpiresAt < new Date()) {
            throw new Error("Verification token expired");
        }

        return user;

    }

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