import { Email } from "@/schemas";
import BaseService from "./BaseService";
import { Users } from "@prisma/client";

type UserColumnsOptional = Partial<Omit<Users, 'ID'>>;

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

    static create(email: Email, data: UserColumnsOptional) {

        return this.client.users.create({
            data: {
                email,
                ...data
            }
        });
    }

    static createThroughEmail(email: Email, verificationCode: string) {

        return this.create(email, {
            verificationCode,
            verificationCodeExpiresAt: new Date(Date.now() + VERIFICATION_EMAIL_EXPIRATION_TIME_MS)
        });

    }

    static createThroughSocial(email: Email, data: UserColumnsOptional) {

        return this.create(email, {
            ...data,
            isVerified: true,
        });

    }

    static update(email: Email, data: UserColumnsOptional) {

        return this.client.users.update({
            where: {
                email
            },
            data
        });

    }

    static updateVerificationCode(email: Email, verificationCode: string) {

        return this.update(email, {
            verificationCode,
            verificationCodeExpiresAt: new Date(Date.now() + VERIFICATION_EMAIL_EXPIRATION_TIME_MS)
        });

    }

    static updateVerificationToken(email: Email, verificationToken: string) {

        return this.update(email, {
            verificationToken,
            verificationTokenExpiresAt: new Date(Date.now() + VERIFICATION_EMAIL_EXPIRATION_TIME_MS)
        });

    }

    static updateUserVerificationStatus(email: Email) {

        return this.update(email, {
            isVerified: true,
            verificationCode: null,
            verificationCodeExpiresAt: null
        });

    }

    static updateUserVerificationToken(email: Email) {

        return this.update(email, {
            verificationToken: null,
            verificationTokenExpiresAt: null
        });

    }

}

export default UserService;