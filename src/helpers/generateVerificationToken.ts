import { VERIFICATION_TOKEN_LENGTH } from '@/constants';
import { randomBytes } from 'crypto';

function generateVerificationToken() {
    return randomBytes(VERIFICATION_TOKEN_LENGTH / 2).toString('hex');
}

export default generateVerificationToken;