import BaseError from "./BaseError";

class AuthError extends BaseError {
    redirectUrl?: string;

    constructor(message: string, redirectUrl?: string) {
        super(message);
        this.redirectUrl = redirectUrl;
    }
}

export default AuthError;