import { Email } from "@/schemas";
import { Mailer, Token, TokenDecryptObj } from "@/utils";
import BaseService from "./BaseService";
import { google } from "googleapis";
import axios from "axios";
import { AccessTokenData, AuthCookie, FacebookAccessTokenResponse, FacebookAuthUserInfo, GithubAccessTokenResponse, GithubAuthUserEmail, GithubAuthUserEmailsResponse, GithubAuthUserInfo, GithubAuthUserInfoResponse, GoogleAuthUserInfo } from "@/interfaces";
import UserService from "./UserService";
import { PATHS, AUTH_COOKIE_KEY, AUTH_COOKIE_OPTIONS } from "@/constants";
import { getAuthAccessTokenEncryptionSecretEnv, getAuthGoogleClientIdEnv, getAuthGoogleClientSecretEnv, getMailAdminEmail } from "@/helpers/env";
import { cookies } from "next/dist/client/components/headers";
import { AuthError } from "@/errors";
import { Users } from "@prisma/client";

class AuthService extends BaseService {

    static oauth2Client = new google.auth.OAuth2(
        getAuthGoogleClientIdEnv(),
        getAuthGoogleClientSecretEnv(),
        process.env.APP_URL + PATHS.api.auth.social.google.callback
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

    static async verifyVerificationToken(userToken: string) {

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
        origin: string = process.env.APP_URL!
    ) {

        // TODO: create a templates

        let title = 'Verify your email';
        let content = `Verification code: ${code}`;

        if (isVerified) {
            title = 'Login link';
            content = `Your login link: <a href="${origin}/api/auth?token=${code}">Login</a>`;
        }

        await Mailer.sendMail(
            getMailAdminEmail(),
            recipient,
            title,
            content
        );

    }

    static async createSession(email: Email, userInfo?: Users) {

        if (!userInfo) {

            let userRes = await UserService.getByEmail(email);

            if (!userRes) {
                throw new Error("User not found");
            }

            userInfo = userRes;
        }

        const { refreshToken, encryptedRefreshToken, encryptedAccessToken } = await Token.generateAndEncryptAuthTokens({ email, role: userInfo.role });

        await UserService.updateRefreshToken(email as Email, refreshToken);

        return {
            authenticated: true,
            refreshToken: encryptedRefreshToken,
            accessToken: encryptedAccessToken
        };

    }

    static async logout(authCookie: AuthCookie) {

        const { authenticated, accessToken } = authCookie;

        try {

            if (!authenticated || !accessToken) {
                throw new AuthError("Failed to logout");
            }

            const decryptedAccessToken = await Token.decrypt(accessToken, getAuthAccessTokenEncryptionSecretEnv()) as TokenDecryptObj;

            const userData = Token.decode<AccessTokenData>(decryptedAccessToken.payload.token);
            await UserService.updateRefreshToken(userData.email, null);

            authCookie.authenticated = false;
            authCookie.accessToken = null;
            authCookie.refreshToken = null;

            cookies().set(AUTH_COOKIE_KEY, JSON.stringify(authCookie), AUTH_COOKIE_OPTIONS);

        } catch (error: any) {
            console.log(error.message);
            throw new AuthError("Failed to logout");
        }

    }

}

export default AuthService;