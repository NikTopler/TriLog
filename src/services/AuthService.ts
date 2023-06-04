import { Email } from "@/schemas";
import { Mailer } from "@/utils";
import BaseService from "./BaseService";
import { google } from "googleapis";
import axios from "axios";
import { FacebookAccessTokenResponse, FacebookAuthUserInfo, GithubAccessTokenResponse, GithubAuthUserEmail, GithubAuthUserEmailsResponse, GithubAuthUserInfo, GithubAuthUserInfoResponse, GoogleAuthUserInfo } from "@/interfaces";
import UserService from "./UserService";
import { PATHS } from "@/constants";

class AuthService extends BaseService {

    static oauth2Client = new google.auth.OAuth2(
        process.env.AUTH_GOOGLE_CLIENT_ID,
        process.env.AUTH_GOOGLE_CLIENT_SECRET,
        process.env.APP_URL + PATHS.AUTH.SOCIAL.GOOGLE.CALLBACK
    );

    static getGoogleUserData(tokenID: string, accessToken: string) {

        return axios.get<GoogleAuthUserInfo>('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken, {
            headers: {
                Authorization: `Bearer ${tokenID}`
            }
        }).then(({ data }) => {

            if (data) {
                return data;
            }

            throw new Error("Did not receive user data from Google", {
                cause: "User did not grant access to their Google account"
            });

        });

    }

    static getFacebookAccessToken(clientId: string, redirectUrl: string, clientSecret: string, code: string) {

        return axios.get<FacebookAccessTokenResponse>(`https://graph.facebook.com/v17.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUrl}&client_secret=${clientSecret}&code=${code}`).then(({ data }) => {

            if (data) {
                return data;
            }

            throw new Error("Did not receive user data from Facebook", {
                cause: "User did not grant access to their Facebook account"
            });

        });

    }

    static getFacebookUserData(accessToken: string) {

        return axios.get<FacebookAuthUserInfo>(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`).then(({ data }) => {

            if (data) {
                return data;
            }

            throw new Error("Did not receive user data from Facebook", {
                cause: "User did not grant access to their Facebook account"
            });

        });

    }

    static getGithubAccessToken(clientId: string, clientSecret: string, code: string) {

        return axios.get<GithubAccessTokenResponse>(`https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(({ data }) => {

            if (data) {
                return data;
            }

            throw new Error("Did not receive user data from Github", {
                cause: "User did not grant access to their Github account"
            });

        });

    }

    static getGithubUserData(accessToken: string) {

        const userInfoPromise = axios.get<GithubAuthUserInfoResponse>(`https://api.github.com/user`, {
            headers: {
                Authorization: `token ${accessToken}`
            }
        });

        const userEmailsPromise = axios.get<GithubAuthUserEmailsResponse>(`https://api.github.com/user/emails`, {
            headers: {
                Authorization: `token ${accessToken}`
            }
        });

        return Promise.all([userInfoPromise, userEmailsPromise]).then(([{ data: userInfo }, { data: userEmails }]) => ({
            ...userInfo,
            id: userInfo.id.toString(),
            email: userEmails.find((email: GithubAuthUserEmail) => email.primary)?.email
        })) as Promise<GithubAuthUserInfo>;

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