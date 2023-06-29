import { Email } from "@/schemas";
import BaseService, { handleResult } from "./BaseService";
import { Users } from "@prisma/client";

type UserColumnsOptional = Partial<Omit<Users, 'ID'>>;

const VERIFICATION_EMAIL_EXPIRATION_TIME_MS = 2 * 60 * 1000;

const base = new BaseService('users');
class UserService {

    static getByEmail(email: Email) {

        return handleResult<Users | null>(base._tableClient.findUnique({
            where: {
                email
            }
        }));

    }

    static getByRefreshToken(refreshToken: string) {

        return handleResult<Users | null>(base._tableClient.findFirst({
            where: {
                refreshToken
            }
        }));

    }

    static getByVerificationToken(verificationToken: string) {

        return handleResult<Users | null>(base._tableClient.findFirst({
            where: {
                verificationToken
            }
        }));

    }

    static create(email: Email, data: UserColumnsOptional) {

        return handleResult<Users>(base._tableClient.create({
            data: {
                email,
                ...data
            }
        }));

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
            isVerified: true
        });

    }

    static update(email: Email, data: UserColumnsOptional) {

        return handleResult(base._tableClient.update({
            where: {
                email
            },
            data
        }));

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

    static updateRefreshToken(email: Email, refreshToken: string | null) {

        return this.update(email, {
            refreshToken
        });

    }

}

export default UserService;