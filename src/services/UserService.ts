import { Email } from "@/schemas";
import BaseService from "./BaseService";

const VERIFICATION_EMAIL_EXPIRATION_TIME_MS = 2 * 60 * 1000;

class UserService extends BaseService {

    static getByEmail(email: Email) {

        return this.client.users.findUnique({
            where: {
                email
            }
        });

    }

    static getByVerificationToken(verificationToken: string) {

        return this.client.users.findFirst({
            where: {
                verificationToken
            }
        });

    }

    static create(email: Email, verificationCode: string) {

        return this.client.users.create({
            data: {
                email,
                verificationCode,
                verificationCodeExpiresAt: new Date(Date.now() + VERIFICATION_EMAIL_EXPIRATION_TIME_MS)
            }
        });

    }

    static updateVerificationCode(email: Email, verificationCode: string) {

        return this.client.users.update({
            where: {
                email
            },
            data: {
                verificationCode,
                verificationCodeExpiresAt: new Date(Date.now() + VERIFICATION_EMAIL_EXPIRATION_TIME_MS)
            }
        });

    }

    static updateVerificationToken(email: Email, verificationToken: string) {

        return this.client.users.update({
            where: {
                email
            },
            data: {
                verificationToken,
                verificationTokenExpiresAt: new Date(Date.now() + VERIFICATION_EMAIL_EXPIRATION_TIME_MS)
            }
        });

    }

    static async verifyVerificationCode(email: Email, userCode: string) {

        const user = await this.getByEmail(email);

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

        const user = await this.getByVerificationToken(userToken);

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

    static updateUserVerificationStatus(email: Email) {

        return this.client.users.update({
            where: {
                email
            },
            data: {
                isVerified: true,
                verificationCode: null,
                verificationCodeExpiresAt: null
            }
        });

    }

    static updateUserVerificationToken(email: Email) {

        return this.client.users.update({
            where: {
                email
            },
            data: {
                verificationToken: null,
                verificationTokenExpiresAt: null
            }
        });

    }

}

export default UserService;