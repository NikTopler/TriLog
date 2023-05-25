import { DatabaseConn } from "@/utils";
import { PrismaPromise } from "@prisma/client";

export enum ApiMessages {
    INVALID_PARAMS = 'Invalid parameters',
    INVALID_EMAIL = 'Invalid email',
    INVALID_AUTH_TOKEN = 'Invalid auth token',
    AUTH_SUCCESS = 'Authentication successful',
    AUTH_ERROR = 'Authentication failed',
    AUTH_VERIFICATION_LINK_SENT = 'Email verification link sent successfully',
    AUTH_VERIFICATION_LINK_SENT_ERROR = 'Could not send verification link',
    EMAIL_VERIFIED = 'Email verified successfully',
    EMAIL_VERIFIED_ERROR = 'Could not verify email',
}

class BaseService extends DatabaseConn {

    static async handle<T>(promise: PrismaPromise<T>) {

        try {
            return await promise;
        } catch (error: any) {
            // TODO: Write into a log file
            console.log(error);
            throw new Error(error.message);
        }

    }

}

export default BaseService;