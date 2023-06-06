import { VERIFICATION_TOKEN_LENGTH } from "@/constants";
import { randomBytes } from "crypto";

function generateToken(numBytes: number = VERIFICATION_TOKEN_LENGTH / 2) {
    return randomBytes(numBytes).toString('hex');
}

export default generateToken;