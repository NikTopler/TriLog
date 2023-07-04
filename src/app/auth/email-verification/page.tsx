'use client';

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomTextBox } from "@/components/inputs";
import { apiPost, createQueryString, isEmail } from "@/helpers";
import { Email } from "@/schemas";
import { EmailAuthContext } from "../layout";
import { useAuthContext } from "@/providers";
import { SpecialKey } from "@/types";
import styles from "./email-verification.module.scss";

interface VerificationFieldConfig {
    value: string;
    isFocused: boolean;
}

const NUM_OF_VERIFICATION_FIELDS = 5;
const EMAIL_VERIFICATION_TIMEOUT_MS = 30000;

function EmailVerification() {

    const auth = useAuthContext();
    const { email } = useContext(EmailAuthContext);

    const router = useRouter();
    const searchParams = useSearchParams();

    const [emailResendTimeout, setEmailResendTimeout] = useState<number | null>(null);
    const [recipient, setRecipient] = useState<Email | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [verificationFields, setVerificationFields] = useState<VerificationFieldConfig[]>([
        { value: '', isFocused: true },
        { value: '', isFocused: false },
        { value: '', isFocused: false },
        { value: '', isFocused: false },
        { value: '', isFocused: false }
    ]);

    const code = verificationFields.map((field) => field.value).join('');

    useEffect(() => {

        if (isEmail(email)) {
            setRecipient(email);
        } else {
            throw new Error('There has been an error. Please try again later.');
        }

    }, []);

    useEffect(() => {

        if (NUM_OF_VERIFICATION_FIELDS === code.length) {

            setIsLoading(true);

            if(!isEmail(email)) {
                return;
            }

            auth.emailVerification(email, code)
                .finally(() => setIsLoading(false));

            apiPost('/api/auth/email-verification', { email, verificationCode: code })
                .then(() => router.push('/'))
                .catch((err) => {
                    setIsLoading(false);
                    // TODO: Handle error
                    console.log(err);
                });
        }

    }, [code])

    useEffect(() => {

        if (emailResendTimeout) {
            // TODO: clear timeout
            setTimeout(() => setEmailResendTimeout(null), emailResendTimeout);
        }

    }, [emailResendTimeout]);

    const isTextboxValueValid = (value: string) => {

        return (
            value.length <= 1
            && value.length >= 0
            && !isNaN(Number(value))
        );

    }

    const handleInputChange = (value: string, idx: number) => {

        if (value.length === 5) {

            const chars = value.split('');
            const isAllCharsValid = chars.every((char) => isTextboxValueValid(char));

            if (isAllCharsValid) {
                setVerificationFields([
                    { value: chars[0], isFocused: false },
                    { value: chars[1], isFocused: false },
                    { value: chars[2], isFocused: false },
                    { value: chars[3], isFocused: false },
                    { value: chars[4], isFocused: false }
                ]);
            }

            return;
        }

        if (!isTextboxValueValid(value)) {
            return;
        }

        setVerificationFields((prev) => {

            const newVerificationFields = [...prev];
            newVerificationFields[idx].value = value;

            if (value.length === 1) {

                newVerificationFields[idx].isFocused = false;
                if (idx < 4) {
                    newVerificationFields[idx + 1].isFocused = true;
                }

            }

            return newVerificationFields;

        });
    }

    const handleSpecialKeyClick = (key: SpecialKey, idx: number) => {

        if ((key === 'Backspace' || key === 'Delete')
            && idx !== 0
            && verificationFields[idx].value.length === 0
        ) {

            setVerificationFields((prev) => {

                const newVerificationFields = [...prev];

                newVerificationFields[idx].isFocused = false;
                newVerificationFields[idx - 1].isFocused = true;

                return newVerificationFields;

            });

        }

    }

    const handleInputFocusChange = (isFocused: boolean, idx: number) => {

        if (verificationFields[idx].isFocused === isFocused) {
            return;
        }

        setVerificationFields((prev) => {
            const newVerificationFields = [...prev];
            newVerificationFields[idx].isFocused = isFocused;

            return newVerificationFields;
        });

    }

    const onEmailResendClick = (e: any) => {

        e.preventDefault();

        if (emailResendTimeout) {
            return;
        }

        setEmailResendTimeout(EMAIL_VERIFICATION_TIMEOUT_MS);

        apiPost('/api/auth/login', { recipient })
            .then(() => router.push('/auth/email-verification?' + createQueryString(searchParams, { email: recipient as string })))
            .catch((err) => console.log(err));

    }

    const onUpdateEmailClick = (e: any) => {
        e.preventDefault();
        router.push('/auth/login');
    }

    return (
        <>
            <header className="auth-container__popup-header">
                <h1>Verify your email</h1>
            </header>

            <div className="auth-container__popup-main">
                <p className={styles['description']}>
                    You're almost done! We sent a code to
                    <span className={styles['auth-container__popup-main-user-email']}>
                        {recipient}
                    </span>
                </p>
                <div className="auth-container__popup-main__form">
                    <div className={styles['auth-container__popup-main__form-input__container']}>
                        {verificationFields.map(({ value, isFocused }, idx) =>
                            <div key={idx} className={styles['auth-container__popup-main__form-input__container--input']}>
                                <CustomTextBox
                                    value={value}
                                    type="text"
                                    isFocused={isFocused}
                                    isDisabled={isLoading}
                                    style={{
                                        borderRadius: '4px',
                                        margin: '0 0 5px 0',
                                        fontSize: '42px',
                                        width: '100%',
                                        height: '72px'
                                    }}
                                    handleInputChange={(value) => handleInputChange(value, idx)}
                                    handleSpecialKeyClick={(key) => handleSpecialKeyClick(key, idx)}
                                    handleInputFocusChange={(isFocused) => handleInputFocusChange(isFocused, idx)}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles['auth-container__popup-main__form--resend']}>
                        <div className="flex items-center">
                            <p>Didn't receive the code?</p>
                        </div>
                        <div className="flex">
                            <a href="#" onClick={onEmailResendClick} className="link">Resend the code</a>
                            <p>&nbsp; or &nbsp;</p>
                            <a href="#" onClick={onUpdateEmailClick} className="link">update your email</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default EmailVerification;